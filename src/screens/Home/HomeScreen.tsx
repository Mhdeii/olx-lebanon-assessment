import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../store/language.store';
import { t } from '../../i18n/t';
import { CustomView } from '../../components/CustomView';
import { CustomText } from '../../components/CustomText';
import HomeHeader from './components/HomeHeader';
import BannerCarousel from './components/BannerCarousel';
import CategoryList from './components/CategoryList';
import AdCard from '../../components/ads/AdCard';
import { fetchCategories } from '../../api/categories.api';
import { fetchAds } from '../../api/ads.api';
import { Category } from '../../types/category.types';
import { Ad } from '../../types/ad.types';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const HomeScreen = observer(({ navigation }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [carsAds, setCarsAds] = useState<Ad[]>([]);
  const [propertyAds, setPropertyAds] = useState<Ad[]>([]);
  const [mobileAds, setMobileAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHomeData = async () => {
    try {
      const rawCategories = await fetchCategories();
      setCategories(rawCategories);

      const [cars, properties, mobiles] = await Promise.all([
        fetchAds({ categoryId: '23', dynamicFields: {} }, 0, 8),
        fetchAds({ categoryId: '95', dynamicFields: {} }, 0, 8),
        fetchAds({ categoryId: '9', dynamicFields: {} }, 0, 8),
      ]);

      setCarsAds(cars);
      setPropertyAds(properties);
      setMobileAds(mobiles);
    } catch (error) {
      console.error('Failed to load home data', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadHomeData();
  };

  const renderSection = (title: string, ads: Ad[], categoryId: string) => (
    <View style={styles.section}>
      <CustomView row style={[styles.sectionHeader]}>
        <CustomText style={styles.sectionTitle}>{title}</CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { categoryId, categoryName: title })}>
          <CustomText tx="see_all" style={styles.seeAll} />
        </TouchableOpacity>
      </CustomView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.cardsScroll, { flexDirection: languageStore.isRTL ? 'row-reverse' : 'row' }]}
      >
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            horizontal
            onPress={() => navigation.navigate('SearchResults', { categoryId, categoryName: title })}
          />
        ))}
      </ScrollView>
    </View>
  );

  const getCategoryName = (id: string, fallbackKey: string) => {
    const cat = categories.find(c => c.externalID === id);
    if (!cat) return t(fallbackKey as any);
    return languageStore.isRTL ? cat.name_l1 : cat.name;
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        location={t('all_lebanon')}
        onSearch={(q) => navigation.navigate('SearchResults', { query: q })}
        onLocationPress={() => {
          languageStore.toggleLanguage();
        }}
      />
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        <BannerCarousel />
        <CategoryList
          categories={categories}
          onCategoryPress={(c) => navigation.navigate('SearchResults', { categoryId: c.externalID, categoryName: languageStore.isRTL ? c.name_l1 : c.name })}
        />

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <>
            {renderSection(t('fresh_recommendations'), [...carsAds, ...propertyAds, ...mobileAds].sort(() => 0.5 - Math.random()).slice(0, 8), '')}
            {renderSection(getCategoryName('23', 'categories'), carsAds, '23')}
            {renderSection(getCategoryName('95', 'categories'), propertyAds, '95')}
            {renderSection(getCategoryName('9', 'categories'), mobileAds, '9')}
          </>
        )}
      </ScrollView>
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
  },
  sectionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  seeAll: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '600',
  },
  cardsScroll: {
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm,
  },
});

export default HomeScreen;
