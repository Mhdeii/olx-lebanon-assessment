import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Ad} from '../../types/ad.types';
import Card from '../common/Card';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

interface AdCardProps {
  ad: Ad;
  onPress?: () => void;
  horizontal?: boolean;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HORIZONTAL_CARD_WIDTH = SCREEN_WIDTH * 0.45;

const AdCard: React.FC<AdCardProps> = ({ad, onPress, horizontal}) => {
  const imageUrl = ad.images[0]?.url || 'https://via.placeholder.com/300';

  return (
    <Card 
      onPress={onPress} 
      style={[
        styles.container, 
        horizontal && {width: HORIZONTAL_CARD_WIDTH, marginRight: SPACING.md}
      ]}
    >
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.price}>{ad.price.formatted}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.location} numberOfLines={1}>
            {ad.location.name}
          </Text>
          <Text style={styles.date}>
            {new Date(ad.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  location: {
    fontSize: 11,
    color: COLORS.textSecondary,
    flex: 1,
  },
  date: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
});

export default React.memo(AdCard);
