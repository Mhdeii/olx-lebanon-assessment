import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView} from 'react-native';
import AdList from '../../components/ads/AdList';
import {useAdsStore} from '../../store/ads.store';
import {useFiltersStore} from '../../store/filters.store';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

const SearchResultsScreen = ({route, navigation}: any) => {
  const {categoryId, query} = route.params || {};
  const {ads, loading, loadAds, hasMore, error} = useAdsStore();
  const {filters, setCategoryId, setQuery} = useFiltersStore();

  useEffect(() => {
    // Sync initial params to store
    if (categoryId) setCategoryId(categoryId);
    if (query) setQuery(query);
    
    // Initial fetch
    loadAds(filters, true);
  }, [categoryId, query]);

  const handleRefresh = () => {
    loadAds(filters, true);
  };

  const handleLoadMore = () => {
    if (hasMore) loadAds(filters);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Search Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>〈</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            defaultValue={filters.query}
            onSubmitEditing={(e) => {
               setQuery(e.nativeEvent.text);
               loadAds({...filters, query: e.nativeEvent.text}, true);
            }}
          />
        </View>
      </View>

      {/* Filter Chips ScrollView */}
      <View style={styles.chipsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          <TouchableOpacity 
            style={[styles.chip, styles.filtersChip]} 
            onPress={() => navigation.navigate('SearchFilters')}
          >
            <Text style={styles.filtersChipText}>⚙ Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>All country ˅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Cars for Sale</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results Meta */}
      <View style={styles.resultsMetaRow}>
        <Text style={styles.resultsText}>
          Showing: <Text style={styles.bold}>5932 Results for Cars for Sale</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.sortText}>Sort By ⇅</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
             <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <AdList
          ads={ads.map(ad => ({...ad, isElite: true}))} // Force Elite style for testing UI
          loading={loading}
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={loading && ads.length === 0}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  backButton: {
    paddingRight: SPACING.md,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: '300',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  chipsWrapper: {
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  chipsContainer: {
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  filtersChip: {
    backgroundColor: COLORS.secondary, // Light Blue
    borderColor: COLORS.secondaryBorder,
  },
  filtersChipText: {
    color: '#0288D1', // active blue
    fontWeight: '700',
    fontSize: 13,
  },
  chipText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 13,
  },
  resultsMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  resultsText: {
    fontSize: 12,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  sortText: {
    color: '#0288D1',
    fontWeight: '600',
    fontSize: 13,
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
