import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../../store/language.store';
import { CustomView } from '../../../components/CustomView';
import { CustomText } from '../../../components/CustomText';
import { Category } from '../../../types/category.types';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

import { getCategoryIcon } from '../../../utils/categoryIcons';

const CategoryList: React.FC<CategoryListProps> = observer(({
  categories,
  onCategoryPress,
}) => {
  const isRTL = languageStore.isRTL;

  if (!categories || categories.length === 0) return null;

  // Filter main categories (level 0 or important ones)
  const mainCategories = categories.filter(c => c.level === 0).slice(0, 10);

  return (
    <View style={styles.container}>
      <CustomView row style={[styles.headerRow]}>
        <CustomText tx="categories" style={styles.title} />
        <TouchableOpacity>
          <CustomText tx="see_all" style={styles.seeAll} />
        </TouchableOpacity>
      </CustomView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
      >
        {mainCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryItem}
            onPress={() => onCategoryPress(cat)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name={getCategoryIcon(cat.externalID)}
                size={28}
                color={COLORS.black}
              />
            </View>
            <Text style={styles.categoryLabel} numberOfLines={2} ellipsizeMode="tail">
              {isRTL ? cat.name_l1 : cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.background,
  },
  headerRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  seeAll: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
  },
  categoryItem: {
    width: 80,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  iconText: {
    fontSize: 24,
  },
  categoryLabel: {
    fontSize: 10,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    height: 28,
  },
});

export default CategoryList;
