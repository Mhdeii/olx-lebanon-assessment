import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';
import {useFiltersStore} from '../../store/filters.store';

const SearchFiltersScreen = ({navigation}: any) => {
  const {filters, setMinPrice, setMaxPrice, clearFilters} = useFiltersStore();
  const [condition, setCondition] = useState<string>('Used'); // 'New' or 'Used'

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={clearFilters} style={styles.headerBtn}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
        
        {/* Category Card */}
        <View style={styles.categoryCard}>
          <View style={styles.catLeft}>
             <View style={styles.catIconContainer}>
               <Text style={styles.catIcon}>🚗</Text>
             </View>
             <View>
               <Text style={styles.catTitle}>Vehicles</Text>
               <Text style={styles.catSubtitle}>Cars for Sale</Text>
             </View>
          </View>
          <TouchableOpacity>
             <Text style={styles.changeBtn}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* List Items */}
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listTitle}>Location</Text>
          <View style={styles.listRight}>
             <Text style={styles.listValue}>All country</Text>
             <Text style={styles.listChevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listTitle}>Brand</Text>
          <View style={styles.listRight}>
             <Text style={styles.listValue}>Toyota</Text>
             <Text style={styles.listChevron}>›</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listTitle}>Payment Facilities</Text>
          <View style={styles.listRight}>
             <Text style={styles.listValue}>All</Text>
             <Text style={styles.listChevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Condition Pills */}
        <View style={styles.inputGroup}>
          <Text style={styles.groupTitle}>Condition</Text>
          <View style={styles.pillsRow}>
            {['New', 'Used'].map(c => (
              <TouchableOpacity 
                key={c}
                style={[
                  styles.pill, 
                  condition === c ? styles.pillActive : undefined
                ]}
                onPress={() => setCondition(c)}
              >
                <Text 
                  style={[
                    styles.pillText, 
                    condition === c ? styles.pillTextActive : undefined
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Highlights Pills */}
        <View style={styles.inputGroup}>
          <Text style={styles.groupTitle}>Highlights</Text>
          <View style={[styles.pillsRow, {flexWrap: 'wrap'}]}>
             <TouchableOpacity style={[styles.pill, styles.pillActive, {marginRight: 8, marginBottom: 8}]}>
                <Text style={styles.pillTextActive}>Panorama</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.pill, {marginRight: 8, marginBottom: 8}]}>
                <Text style={styles.pillText}>Video</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.pill, {marginRight: 8, marginBottom: 8}]}>
                <Text style={styles.pillText}>Leather Seats</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.inputGroup}>
          <Text style={styles.groupTitle}>Price (USD)</Text>
          <View style={styles.priceRow}>
            <View style={styles.priceInputBox}>
              <Text style={styles.currencyPrefix}>USD</Text>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Min" 
                keyboardType="numeric"
                defaultValue={filters.minPrice?.toString()}
                onChangeText={(v) => setMinPrice(v ? parseInt(v) : undefined)}
              />
            </View>
            <Text style={styles.priceSeparator}>-</Text>
            <View style={styles.priceInputBox}>
              <Text style={styles.currencyPrefix}>USD</Text>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Max" 
                keyboardType="numeric"
                defaultValue={filters.maxPrice?.toString()}
                onChangeText={(v) => setMaxPrice(v ? parseInt(v) : undefined)}
              />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.footerButtonText}>See 5773 Results</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerBtn: {
    padding: SPACING.xs,
    minWidth: 60,
  },
  closeIcon: {
    fontSize: 22,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  clearText: {
    fontSize: 14,
    color: '#0288D1', // blue
    fontWeight: '600',
    textAlign: 'right',
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background, // F5F5F5
  },
  contentPadding: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  catIcon: {
    fontSize: 18,
  },
  catTitle: {
    fontSize: 12,
    color: '#666',
  },
  catSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  changeBtn: {
    color: '#0288D1',
    fontWeight: '600',
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listValue: {
    color: '#666',
    marginRight: 8,
  },
  listChevron: {
    fontSize: 18,
    color: '#999',
  },
  inputGroup: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: SPACING.md,
  },
  pillsRow: {
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: COLORS.white,
    marginRight: 12,
  },
  pillActive: {
    backgroundColor: COLORS.secondary, // Light Blue
    borderColor: COLORS.secondaryBorder,
  },
  pillText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  pillTextActive: {
    color: '#0288D1', // Blue text
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 48,
    backgroundColor: COLORS.white,
  },
  currencyPrefix: {
    color: '#666',
    marginRight: 8,
    fontSize: 14,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  priceSeparator: {
    marginHorizontal: SPACING.md,
    fontSize: 18,
    color: '#666',
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  footerButton: {
    backgroundColor: '#222', // Dark Gray/Black
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchFiltersScreen;
