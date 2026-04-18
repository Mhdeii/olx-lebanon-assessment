import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useFiltersStore} from '../../store/filters.store';
import {fetchCategoryFields} from '../../api/categories.api';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {useAdsStore} from '../../store/ads.store';

const SearchFiltersScreen = ({navigation}: any) => {
  const {filters, setPriceRange, setDynamicField, resetFilters} = useFiltersStore();
  const {loadAds} = useAdsStore();
  const [dynamicFields, setDynamicFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFields = async () => {
      if (!filters.categoryId) return;
      
      setLoading(true);
      try {
        const data = await fetchCategoryFields([filters.categoryId]);
        // Extract fields from API response (Key is the category ID)
        const fields = data[filters.categoryId] || [];
        setDynamicFields(fields);
      } catch (error) {
        console.error('Failed to load dynamic fields', error);
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, [filters.categoryId]);

  const handleApply = () => {
    loadAds(filters, true);
    navigation.goBack();
  };

  const renderDynamicField = (field: any) => {
    // Basic dynamic field rendering support
    // In a full implementation, this would handle dropdowns, checkboxes, etc.
    return (
      <View key={field.id} style={styles.fieldContainer}>
        <Text style={styles.label}>{field.label}</Text>
        <Input
          placeholder={field.label}
          value={filters.dynamicFields[field.id] || ''}
          onChangeText={(val) => setDynamicField(field.id, val)}
          containerStyle={styles.dynamicInput}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Price Range</Text>
        <View style={styles.priceContainer}>
          <Input
            placeholder="Min Price"
            keyboardType="numeric"
            value={filters.minPrice?.toString()}
            onChangeText={(val) => setPriceRange(Number(val), filters.maxPrice)}
            containerStyle={styles.priceInput}
          />
          <View style={styles.priceDivider} />
          <Input
            placeholder="Max Price"
            keyboardType="numeric"
            value={filters.maxPrice?.toString()}
            onChangeText={(val) => setPriceRange(filters.minPrice, Number(val))}
            containerStyle={styles.priceInput}
          />
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} style={styles.loader} />
        ) : (
          dynamicFields.map(renderDynamicField)
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Clear All"
          variant="outline"
          onPress={resetFilters}
          style={styles.footerButton}
        />
        <Button
          title="Apply"
          onPress={handleApply}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  priceInput: {
    flex: 1,
    marginBottom: 0,
  },
  priceDivider: {
    width: SPACING.md,
  },
  fieldContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  dynamicInput: {
    marginBottom: 0,
  },
  loader: {
    marginTop: SPACING.xl,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});

export default SearchFiltersScreen;
