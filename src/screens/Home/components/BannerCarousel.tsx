import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_WIDTH = SCREEN_WIDTH - SPACING.lg * 2;
const BANNER_HEIGHT = 140;

const BANNERS = [
  require('../../../assets/banner1.png'),
  require('../../../assets/banner2.png'),
  require('../../../assets/banner3.png'),
];

const BannerCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < BANNERS.length - 1) {
        flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
      } else {
        flatListRef.current?.scrollToIndex({ index: 0, animated: true });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.bannerContainer}>
      <Image source={item} style={styles.bannerImage} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: CAROUSEL_WIDTH,
          offset: CAROUSEL_WIDTH * index,
          index,
        })}
      />
      <View style={styles.indicatorContainer}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width: CAROUSEL_WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  bannerContainer: {
    width: CAROUSEL_WIDTH,
    height: BANNER_HEIGHT,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default BannerCarousel;
