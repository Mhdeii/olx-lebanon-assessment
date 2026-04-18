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
import BottomNavBar from '../../components/common/BottomNavBar';
import {fetchCategories} from '../../api/categories.api';
import {fetchAds} from '../../api/ads.api';
import {Category} from '../../types/category.types';
import {Ad} from '../../types/ad.types';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

const HomeScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [carsAds, setCarsAds] = useState<Ad[]>([]);
  const [propertyAds, setPropertyAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const rawCategories = await fetchCategories();
        setCategories(rawCategories);

        // Fetch curated sections (Categories 23: Cars for Sale, Property)
        const [cars, properties] = await Promise.all([
          fetchAds({categoryId: '23', dynamicFields: {}}, 0, 5),
          fetchAds({categoryId: '2', dynamicFields: {}}, 0, 5), // '2' is usually Properties
        ]);

        setCarsAds(cars);
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
        <Text style={styles.seeAll} onPress={() => navigation.navigate('SearchResults', {categoryId})}>
          See all
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
        {ads.map((ad) => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            horizontal 
            onPress={() => navigation.navigate('SearchResults', {categoryId})} 
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainScroll} contentContainerStyle={styles.content}>
        <HomeHeader 
          location="Lebanon" 
          onSearch={(q) => navigation.navigate('SearchResults', {query: q})}
          onLocationPress={() => console.log('Location')}
        />
        <CategoryList 
          categories={categories} 
          onCategoryPress={(c) => navigation.navigate('SearchResults', {categoryId: c.externalID})} 
        />
        
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <>
            {renderSection('International Properties', propertyAds, '2')}
            {renderSection('Cars for Sale', carsAds, '23')}
          </>
        )}
      </ScrollView>
      
      {/* Sticky Bottom Nav Bar */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // F5F5F5
  },
  mainScroll: {
    flex: 1,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  loader: {
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  seeAll: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  cardsScroll: {
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm, // since cards have marginRight
  },
});

export default HomeScreen;
