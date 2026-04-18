import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Image,
  Dimensions,
  I18nManager,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../store/language.store';
import { t } from '../../i18n/t';
import { CustomView } from '../../components/CustomView';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { useFiltersStore } from '../../store/filters.store';
import { fetchCategories, fetchCategoryFields } from '../../api/categories.api';
import { fetchLocations } from '../../api/locations.api';
import { fetchAdsCount } from '../../api/ads.api';
import { Location } from '../../types/location.types';
import { Category } from '../../types/category.types';

import { getCategoryIcon } from '../../utils/categoryIcons';

import { CustomText } from '../../components/CustomText';

const SearchFiltersScreen = observer(({ navigation }: any) => {
  const isRTL = languageStore.isRTL;
  const {
    filters,
    setPriceRange,
    setLocationId,
    setDynamicField,
    resetFilters,
  } = useFiltersStore();

  const [fields, setFields] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [cats, locs] = await Promise.all([
          fetchCategories(),
          fetchLocations()
        ]);
        setCategories(Array.isArray(cats) ? cats : (cats as any).data || []);
        setLocations(Array.isArray(locs) ? locs : (locs as any).data || []);
      } catch (e) {
        console.error('Metadata load failed', e);
      }
    };
    loadMetadata();
  }, []);

  useEffect(() => {
    const loadFields = async () => {
      if (filters.categoryId) {
        setLoading(true);
        try {
          const allFields = await fetchCategoryFields([filters.categoryId]);
          const catFields = allFields[filters.categoryId]?.flatFields || [];
          setFields(catFields.filter((f: any) =>
            f.roles.includes('filterable') && f.attribute !== 'price'
          ));
        } catch (e) {
          console.error('Fields load failed', e);
        } finally {
          setLoading(false);
        }
      } else {
        setFields([]);
      }
    };
    loadFields();
  }, [filters.categoryId]);

  const updateCount = useCallback(async () => {
    setCountLoading(true);
    try {
      const count = await fetchAdsCount(filters);
      setResultsCount(count);
    } catch (e) {
      console.error('Count fetch failed', e);
    } finally {
      setCountLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(updateCount, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [filters, updateCount]);

  const activeLocation = locations.find(l => l.externalID === filters.locationId);

  let selectedCategory: Category | undefined;
  let selectedParent: Category | undefined;

  for (const parent of categories) {
    if (parent.externalID === filters.categoryId) {
      selectedCategory = parent;
      break;
    }
    const child = parent.children?.find(c => c.externalID === filters.categoryId);
    if (child) {
      selectedCategory = child;
      selectedParent = parent;
      break;
    }
    for (const c of parent.children || []) {
      const sub = c.children?.find(sc => sc.externalID === filters.categoryId);
      if (sub) {
        selectedCategory = sub;
        selectedParent = c;
        break;
      }
    }
    if (selectedCategory) break;
  }

  const renderSectionHeader = (title: string, tx?: any) => (
    <CustomText tx={tx} style={styles.sectionTitle}>
      {title}
    </CustomText>
  );

  const renderListItem = (label: string, value: string, onPress?: () => void, tx?: any) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <CustomView row style={[styles.listItem]}>
        <View style={styles.listItemContent}>
        <CustomText tx={tx} style={styles.listItemLabel}>{label}</CustomText>
        <CustomText style={styles.listItemValue}>{value}</CustomText>
      </View>
        <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color="#999" />
      </CustomView>
    </TouchableOpacity>
  );

  const renderDynamicField = (field: any) => {
    const currentValue = filters.dynamicFields[field.attribute];
    const fieldName = isRTL ? (field.label_l1 || field.name) : field.name;

    if (field.filterType === 'single_choice' || field.filterType === 'multiple_choice') {
      const isChips = field.choices && field.choices.length <= 5;

      if (isChips) {
        return (
          <View key={field.id} style={styles.sectionContainer}>
            {renderSectionHeader(fieldName)}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.chipsContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            >
              <TouchableOpacity
                style={[styles.pill, !currentValue && styles.pillActive]}
                onPress={() => setDynamicField(field.attribute, undefined)}
              >
                <CustomText tx="any" style={[styles.pillText, !currentValue && styles.pillTextActive]} />
              </TouchableOpacity>
              {field.choices?.map((choice: any) => {
                const isActive = currentValue === choice.value;
                return (
                  <TouchableOpacity
                    key={choice.id}
                    style={[styles.pill, isActive && styles.pillActive]}
                    onPress={() => setDynamicField(field.attribute, isActive ? undefined : choice.value)}
                  >
                    <CustomText style={[styles.pillText, isActive && styles.pillTextActive]}>
                      {isRTL ? (choice.label_l1 || choice.label) : choice.label}
                    </CustomText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        );
      } else {
        const selectedChoice = field.choices?.find((c: any) => c.value === currentValue);
        const displayValue = selectedChoice ? (isRTL ? (selectedChoice.label_l1 || selectedChoice.label) : selectedChoice.label) : t('any');
        return (
          <View key={field.id} style={styles.sectionContainer}>
            {renderListItem(fieldName, displayValue)}
          </View>
        );
      }
    }

    if (field.filterType === 'range') {
      return null;
    }

    return (
      <View key={field.id} style={styles.sectionContainer}>
        {renderListItem(fieldName, currentValue || t('any'))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomView row style={[styles.topRow]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="close-outline" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetFilters} style={styles.textBtn}>
          <CustomText tx="clear_all" style={styles.clearAllText} />
        </TouchableOpacity>
      </CustomView>

      <View style={styles.titleContainer}>
        <CustomText tx="filters" style={styles.mainTitle} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          {renderSectionHeader('', 'category')}
          <CustomView row style={[styles.categoryRow]}>
            <CustomView row style={styles.categoryInfo}>
              <View style={styles.categoryThumbnailContainer}>
                <Ionicons
                  name={getCategoryIcon(selectedParent?.externalID || selectedCategory?.externalID || '')}
                  size={26}
                  color="#000"
                />
              </View>
              <View style={styles.categoryTextWrapper}>
                <CustomText style={styles.categoryName}>
                  {selectedParent ? (isRTL ? selectedParent.name_l1 : selectedParent.name) : (selectedCategory ? (isRTL ? selectedCategory.name_l1 : selectedCategory.name) : t('all_categories'))}
                </CustomText>
                <CustomText style={styles.categoryDesc}>
                  {selectedParent && selectedCategory ? (isRTL ? selectedCategory.name_l1 : selectedCategory.name) : t('click_to_change')}
                </CustomText>
              </View>
            </CustomView>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
              <CustomText tx="change" style={styles.changeLink} />
            </TouchableOpacity>
          </CustomView>
        </View>

        <View style={styles.sectionContainer}>
          {renderListItem('', activeLocation ? (isRTL ? activeLocation.name_l1 : activeLocation.name) : t('all_lebanon'), undefined, 'location')}
        </View>

        <View style={styles.sectionContainer}>
          {renderSectionHeader('', 'price_range')}
          <CustomView row style={[styles.priceInputsRow]}>
            <View style={styles.priceInputWrapper}>
              <TextInput
                style={[styles.priceInput, { textAlign: isRTL ? 'right' : 'left' }]}
                placeholder={t('min')}
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                defaultValue={filters.minPrice?.toString()}
                onChangeText={(v) => setPriceRange(v ? parseInt(v) : undefined, filters.maxPrice)}
              />
            </View>
            <View style={styles.priceInputWrapper}>
              <TextInput
                style={[styles.priceInput, { textAlign: isRTL ? 'right' : 'left' }]}
                placeholder={t('max')}
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                defaultValue={filters.maxPrice?.toString()}
                onChangeText={(v) => setPriceRange(filters.minPrice, v ? parseInt(v) : undefined)}
              />
            </View>
          </CustomView>
        </View>

        {loading ? (
          <ActivityIndicator style={{ padding: 20 }} color={COLORS.primary} />
        ) : (
          fields.map(renderDynamicField)
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.applyButton, countLoading && { opacity: 0.7 }]}
          onPress={() => navigation.goBack()}
          disabled={countLoading}
        >
          {countLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <CustomText tx="see_results" txOptions={{ count: resultsCount.toLocaleString() }} style={styles.applyButtonText} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topRow: {
    paddingHorizontal: SPACING.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    marginLeft: -8,
  },
  textBtn: {
    padding: 4,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  titleContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3A4146',
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#002f34',
    marginBottom: 12,
  },
  categoryRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryThumbnailContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFCE32',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  categoryTextWrapper: {
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#002f34',
  },
  categoryDesc: {
    fontSize: 14,
    color: '#5c6369',
    marginTop: 2,
  },
  changeLink: {
    fontSize: 15,
    fontWeight: '800',
    color: '#3A4146',
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemContent: {
    flex: 1,
  },
  listItemLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#002f34',
    marginBottom: 4,
  },
  listItemValue: {
    fontSize: 14,
    color: '#5c6369',
  },
  chipsContainer: {
    paddingTop: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#c8cbd0',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  pillActive: {
    backgroundColor: '#e6fcf8',
    borderColor: '#00a49f',
  },
  pillText: {
    fontSize: 14,
    color: '#3A4146',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#00a49f',
    fontWeight: '700',
  },
  priceInputsRow: {
    gap: 12,
  },
  priceInputWrapper: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#5c6369',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  priceInput: {
    fontSize: 15,
    color: '#002f34',
  },
  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  applyButton: {
    backgroundColor: '#3a4146',
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default SearchFiltersScreen;
