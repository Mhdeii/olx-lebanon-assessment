import React from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import {Ad} from '../../types/ad.types';
import AdCard from './AdCard';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

interface AdListProps {
  ads: Ad[];
  loading: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const AdList: React.FC<AdListProps> = ({
  ads,
  loading,
  onLoadMore,
  onRefresh,
  refreshing,
}) => {

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No results found</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={ads}
      keyExtractor={item => item.id}
      renderItem={({item}) => <AdCard ad={item} />}
      contentContainerStyle={styles.list}
      numColumns={1} // or 2 if grid is preferred
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl 
          refreshing={!!refreshing} 
          onRefresh={onRefresh} 
          colors={[COLORS.primary]}
        />
      }
      // Performance optimizations
      removeClippedSubviews={true}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: SPACING.md,
  },
  loader: {
    paddingVertical: SPACING.lg,
  },
  empty: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});

export default AdList;
