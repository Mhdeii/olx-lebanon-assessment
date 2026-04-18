import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import HomeHeader from './components/HomeHeader';
import CategoryList from './components/CategoryList';
import AdCard from '../../components/ads/AdCard';
import {fetchCategories} from '../../api/categories.api';
import {fetchAds} from '../../api/ads.api';
import {Category} from '../../types/category.types';
import {Ad} from '../../types/ad.types';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';
import Button from '../../components/common/Button';

const HomeScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [carsAds, setCarsAds] = useState<Ad[]>([]);
  const [mobileAds, setMobileAds] = useState<Ad[]>([]);
  const [propertyAds, setPropertyAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const rawCategories = await fetchCategories();
        setCategories(rawCategories);

        // Fetch curated sections (Categories 1: Vehicles, 3: Mobiles, 2: Properties)
        const [cars, mobiles, properties] = await Promise.all([
          fetchAds({categoryId: '1', dynamicFields: {}}, 0, 5),
          fetchAds({categoryId: '3', dynamicFields: {}}, 0, 5),
          fetchAds({categoryId: '2', dynamicFields: {}}, 0, 5),
        ]);

        setCarsAds(cars);
        setMobileAds(mobiles);
        setPropertyAds(properties);
      } catch (error) {
        console.error('Failed to load home data', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const renderSection = (title: string, ads: Ad[], categoryId: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults', {categoryId})}>
           <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ads.map((ad) => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            horizontal 
            onPress={() => console.log('Ad pressed', ad.id)} 
          />
        ))}
      </ScrollView>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader 
        location="Beirut, Lebanon" 
        onSearch={(q) => navigation.navigate('SearchResults', {query: q})}
        onLocationPress={() => console.log('Location pressed')}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <CategoryList 
          categories={categories} 
          onCategoryPress={(c) => navigation.navigate('SearchResults', {categoryId: c.externalID})} 
        />
        
        {renderSection('Cars for Sale', carsAds, '1')}
        {renderSection('Mobile Phones', mobileAds, '3')}
        {renderSection('Properties', propertyAds, '2')}
      </ScrollView>
    </View>
  );
};

// Simple Touchable wrapper for navigation
const TouchableOpacity = ({children, onPress, style}: any) => (
  <View onStartShouldSetResponder={() => { onPress(); return true; }} style={style}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;
