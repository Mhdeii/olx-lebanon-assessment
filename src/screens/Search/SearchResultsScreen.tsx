import React, { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../store/language.store';
import { t } from '../../i18n/t';
import { CustomView } from '../../components/CustomView';
import { CustomText } from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdList from '../../components/ads/AdList';
import { useAdsStore } from '../../store/ads.store';
import { useFiltersStore } from '../../store/filters.store';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const SearchResultsScreen = observer(({ route, navigation }: any) => {
  const isRTL = languageStore.isRTL;
  const { categoryId, query } = route.params || {};
  const { ads, loading, loadAds, hasMore, error } = useAdsStore();
  const { filters, setCategoryId, setQuery } = useFiltersStore();

  useFocusEffect(
    useCallback(() => {
      let isChanged = false;
      if (categoryId !== undefined && categoryId !== filters.categoryId) {
        setCategoryId(categoryId);
        isChanged = true;
      }
      if (query !== undefined && query !== filters.query) {
        setQuery(query);
        isChanged = true;
      }

      if (!isChanged) {
        loadAds(filters, true);
      }
    }, [categoryId, query, filters, setCategoryId, setQuery, loadAds])
  );

  const handleRefresh = () => {
    loadAds(filters, true);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) loadAds(filters);
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <CustomView row style={[styles.resultsMetaRow]}>
        <CustomText 
          tx="results_for" 
          txOptions={{ 
            count: ads.length, 
            query: query ? `"${query}"` : (route.params?.categoryName || t('search'))
          }} 
          style={styles.resultsText} 
        />
        <TouchableOpacity style={[styles.sortButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <CustomText tx="sort_by" style={styles.sortText} />
          <Ionicons name="swap-vertical" size={14} color="#2196F3" style={{ marginHorizontal: 4 }} />
        </TouchableOpacity>
      </CustomView>

      <CustomView row style={[styles.sectionTitleRow]}>
        <CustomText tx="elite_ads" style={styles.sectionTitle} />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText tx="view_more" style={styles.viewMoreText} />
          <Ionicons name="chevron-forward" size={14} color="#555" />
        </TouchableOpacity>
      </CustomView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomView row style={[styles.topHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={26} color="#000" />
        </TouchableOpacity>
        <CustomView row style={[styles.searchContainer]}>
          <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={{ marginHorizontal: SPACING.xs }} />
          <TextInput
            style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
            placeholder={t('search_placeholder')}
            placeholderTextColor="#888"
            defaultValue={query}
            onSubmitEditing={(e) => {
              const val = e.nativeEvent.text;
              setQuery(val);
            }}
          />
        </CustomView>
      </CustomView>

      <View style={styles.chipsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.chipsContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
        >
          <TouchableOpacity
            style={[styles.chip, styles.filtersChip, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={() => navigation.navigate('SearchFilters')}
          >
            <Ionicons name="options-outline" size={16} color="#00B8D9" style={{ marginHorizontal: 4 }} />
            <CustomText tx="filters" style={styles.filtersChipText} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.chip, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <CustomText tx="all_country" style={styles.chipText} />
            <Ionicons name="chevron-down" size={14} color="#555" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          {route.params?.categoryName && (
            <TouchableOpacity style={[styles.chip, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <CustomText style={styles.chipText}>{route.params?.categoryName}</CustomText>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {error ? (
        <View style={styles.center}>
          <CustomText style={styles.errorText}>{error}</CustomText>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <CustomText tx="retry" style={styles.retryText} />
          </TouchableOpacity>
        </View>
      ) : (
        <AdList
          ads={ads}
          loading={loading}
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={loading && ads.length === 0}
          headerComponent={renderHeader()}
          isEliteMock={true}
        />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topHeader: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  backButton: {
    paddingHorizontal: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: SPACING.sm,
    height: 48,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
  },
  chipsWrapper: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chipsContainer: {
    paddingHorizontal: SPACING.md,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersChip: {
    backgroundColor: '#E0F7FA',
    borderColor: '#00B8D9',
  },
  filtersChipText: {
    color: '#00B8D9',
    fontWeight: '700',
    fontSize: 14,
  },
  chipText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  headerContent: {
    backgroundColor: COLORS.white,
  },
  resultsMetaRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  sortButton: {
    alignItems: 'center',
  },
  sortText: {
    color: '#2196F3',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginRight: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  retryButton: {
    padding: SPACING.sm,
  },
  retryText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SearchResultsScreen;
