import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AdList from '../../components/ads/AdList';
import {useAdsStore} from '../../store/ads.store';
import {useFiltersStore} from '../../store/filters.store';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';
import Input from '../../components/common/Input';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
           <Input 
              placeholder="Search" 
              defaultValue={filters.query}
              onSubmitEditing={(e) => {
                 setQuery(e.nativeEvent.text);
                 loadAds({...filters, query: e.nativeEvent.text}, true);
              }}
              containerStyle={styles.inputContainer}
           />
        </View>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => navigation.navigate('SearchFilters')}
        >
          <Text style={styles.filterText}>Filters</Text>
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
          ads={ads}
          loading={loading}
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={loading && ads.length === 0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  filterButton: {
    marginLeft: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.primary,
    fontWeight: '600',
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
