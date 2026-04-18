import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Ad} from '../../types/ad.types';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

interface AdCardProps {
  ad: Ad;
  horizontal?: boolean;
  onPress: () => void;
  isElite?: boolean; // For search results Elite styling
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; // slightly less than half for horizontal scroll

const AdCard: React.FC<AdCardProps> = ({ad, horizontal, onPress, isElite}) => {
  const imageUrl = ad.images && ad.images.length > 0 
    ? ad.images[0].url 
    : 'https://via.placeholder.com/300';

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        isElite && styles.eliteContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {isElite && (
        <View style={styles.eliteHeader}>
          <Text style={styles.eliteText}>🏅 Elite</Text>
        </View>
      )}
      
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
        {/* Heart Icon Overlay */}
        <TouchableOpacity style={styles.heartButton}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>
        {isElite && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.price} numberOfLines={1}>
          {ad.price.currency} {ad.price.formatted.replace('USD', '').replace('$', '').trim()}
        </Text>
        
        <Text style={styles.title} numberOfLines={1}>
          {ad.title}
        </Text>

        {/* Specs Row */}
        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Text style={styles.specIcon}>🗓</Text>
            <Text style={styles.specText}>2018</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specIcon}>⛽</Text>
            <Text style={styles.specText}>Benzine</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specIcon}>🛣</Text>
            <Text style={styles.specText}>126000</Text>
          </View>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {ad.location.name}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(ad.timestamp).toLocaleDateString()}
        </Text>

        {/* Action Buttons for Elite Vertical Cards */}
        {isElite && !horizontal && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.btn, styles.btnWhatsapp]}>
              <Text style={styles.btnWhatsappText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnCall]}>
              <Text style={styles.btnCallText}>📞 Call</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  horizontalContainer: {
    width: CARD_WIDTH,
    marginRight: SPACING.md,
    marginBottom: SPACING.sm, // Less bottom margin for horizontal carousel
  },
  verticalContainer: {
    width: '100%',
  },
  eliteContainer: {
    borderTopWidth: 4,
    borderTopColor: COLORS.primary, // Gold/Yellow top border
  },
  eliteHeader: {
    backgroundColor: '#D4AF37', // Gold background
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  eliteText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    height: 140,
    width: '100%',
    position: 'relative',
    backgroundColor: '#eee', // fallback
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    color: '#FFF',
    fontSize: 18,
    marginTop: -2,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#E1F5FE', // Light blue
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  verifiedText: {
    color: '#0288D1',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: SPACING.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4D4D', // Red price
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  specIcon: {
    fontSize: 12,
    marginRight: 4,
    color: '#666',
  },
  specText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '500',
  },
  location: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
  },
  btnWhatsapp: {
    backgroundColor: COLORS.whatsapp, // Light green
    borderColor: COLORS.whatsapp,
    marginRight: 4,
  },
  btnWhatsappText: {
    color: COLORS.whatsappText,
    fontWeight: '700',
    fontSize: 13,
  },
  btnCall: {
    backgroundColor: COLORS.white,
    borderColor: '#CCC',
    marginLeft: 4,
  },
  btnCallText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default AdCard;
