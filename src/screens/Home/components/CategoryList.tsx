import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {Category} from '../../../types/category.types';
import {COLORS} from '../../../constants/colors';
import {SPACING} from '../../../constants/spacing';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress,
}) => {

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onCategoryPress(item)}
            style={styles.item}
          >
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>
                {item.name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {item.name}
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
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
  },
  item: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    width: 70,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});

export default CategoryList;
