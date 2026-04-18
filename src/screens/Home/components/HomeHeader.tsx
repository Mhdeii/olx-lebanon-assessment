import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {SPACING} from '../../../constants/spacing';

interface HomeHeaderProps {
  location: string;
  onSearch: (query: string) => void;
  onLocationPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  location,
  onSearch,
  onLocationPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Bar Location */}
      <TouchableOpacity 
        onPress={onLocationPress} 
        style={styles.locationContainer}
        activeOpacity={0.7}
      >
        <Text style={styles.iconText}>📍</Text>
        <Text style={styles.locationValue} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.chevronText}>˅</Text>
      </TouchableOpacity>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor={COLORS.textSecondary}
          onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
        />
      </View>

      {/* Hero Banner Placeholder (Using an image URL matching the hero slider description) */}
      <View style={styles.heroBanner}>
        <View style={styles.heroLeft}>
          <Image 
            source={{uri: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=400&auto=format&fit=crop'}} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
        </View>
        <View style={styles.heroRight}>
          <Text style={styles.heroText}>BUY YOUR</Text>
          <Text style={styles.heroBold}>MOBILE</Text>
          <Text style={styles.heroBold}>DIRECTLY</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconText: {
    fontSize: 16,
    marginRight: 4,
    color: COLORS.primary,
  },
  chevronText: {
    fontSize: 16,
    marginLeft: 4,
    color: '#333',
    fontWeight: '400',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 48,
    marginBottom: SPACING.lg,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    height: '100%',
  },
  heroBanner: {
    flexDirection: 'row',
    height: 140,
    backgroundColor: '#E0F7FA', // Light blue background from screenshot
    borderRadius: 8,
    overflow: 'hidden',
  },
  heroLeft: {
    width: '45%',
    backgroundColor: '#FAF3E0', // slight beige backdrop
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroRight: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heroText: {
    fontSize: 14,
    color: '#333',
    letterSpacing: 1,
  },
  heroBold: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
    lineHeight: 26,
  },
  heroButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary, // Yellow
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 16,
  },
  heroButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
});

export default HomeHeader;
