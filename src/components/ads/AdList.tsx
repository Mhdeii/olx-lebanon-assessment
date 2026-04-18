import React from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { Ad } from '../../types/ad.types';
import AdCard from './AdCard';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { CustomText } from './../CustomText';
interface AdListProps {
  ads: Ad[];
  loading: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  onAdPress?: (ad: Ad) => void;
  headerComponent?: React.ReactElement;
  isEliteMock?: boolean;
}

const AdList: React.FC<AdListProps> = ({
  ads,
  loading,
  onLoadMore,
  onRefresh,
  refreshing,
  onAdPress,
  headerComponent,
  isEliteMock,
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
        <CustomText tx="no_results" style={styles.emptyText} />
      </View>
    );
  };

  return (
    <FlatList
      data={ads}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <AdCard
          ad={item}
          onPress={() => onAdPress?.(item)}
          isElite={isEliteMock ? index < 2 : false}
        />
      )}
      ListHeaderComponent={headerComponent}
      contentContainerStyle={styles.list}
      numColumns={1}
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
    paddingTop: 0,
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
