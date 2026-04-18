import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Category} from '../../../types/category.types';
import {COLORS} from '../../../constants/colors';
import {SPACING} from '../../../constants/spacing';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

// Maps category IDs to basic emojis as dummy icons
const CATEGORY_ICONS: Record<string, string> = {
  '1': '🚗', // Vehicles
  '2': '🏢', // Properties
  '3': '📱', // Mobiles
  '4': '💻', // Electronics
  '5': '🛋️', // Furniture
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress,
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Browse Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={styles.categoryItem}
            onPress={() => onCategoryPress(cat)}
            activeOpacity={0.7}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>
                {CATEGORY_ICONS[cat.externalID] || '📦'}
              </Text>
            </View>
            <Text style={styles.categoryLabel} numberOfLines={2} ellipsizeMode="tail">
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.background, // Light grey separation
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#2196F3', // Light blue link
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingHorizontal: SPACING.md, // slightly less than lg to allow starting earlier
  },
  categoryItem: {
    width: 80,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary, // Yellow
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconText: {
    fontSize: 28,
  },
  categoryLabel: {
    fontSize: 11,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CategoryList;
