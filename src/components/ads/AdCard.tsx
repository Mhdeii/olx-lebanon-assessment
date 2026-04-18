import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  I18nManager,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ad } from '../../types/ad.types';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../store/language.store';
import { CustomView } from '../CustomView';

import { CustomText } from '../CustomText';

interface AdCardProps {
  ad: Ad;
  horizontal?: boolean;
  onPress: () => void;
  isElite?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

const SPEC_ICONS: Record<string, string> = {
  ft: 'grid-outline',
  rooms: 'bed-outline',
  bathrooms: 'water-outline',
  year: 'calendar-outline',
  mileage: 'speedometer-outline',
};

const timeAgo = (date: string, lang: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const isAr = lang === 'ar';

  if (seconds < 60) return isAr ? 'الآن' : 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return isAr ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return isAr ? `منذ ${days} أيام` : `${days} days ago`;
  return new Date(date).toLocaleDateString(lang);
};

const AdCard: React.FC<AdCardProps> = observer(({ ad, horizontal, onPress, isElite = false }) => {
  const isRTL = languageStore.isRTL;

  const imageUrl = ad.images && ad.images.length > 0
    ? ad.images[0].url
    : 'https://www.olx.com.lb/static/olxlb/naspers/images/category_placeholder.png';

  const priceValue = ad.price.value ? ad.price.value.toLocaleString() : '0';
  const priceText = `${ad.price.currency} ${priceValue}`;

  const specs = (ad.formattedExtraFields || [])
    .filter(f => SPEC_ICONS[f.attribute])
    .slice(0, 3);

  const handleWhatsApp = () => {
    const phone = ad.user.contactInfo?.phoneNumber || '';
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const handleCall = () => {
    const phone = ad.user.contactInfo?.phoneNumber || '';
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        isElite && styles.eliteCardMargin
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {isElite && (
        <CustomView row style={styles.eliteHeader}>
          <Ionicons name="ribbon" size={16} color={COLORS.black} style={{ marginHorizontal: 4 }} />
          <CustomText tx="elite" style={styles.eliteHeaderText} />
        </CustomView>
      )}

      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.heartOverlay}>
          <Ionicons name="heart-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>

        {true && (
          <CustomView row style={[styles.verifiedBadge, { left: isRTL ? undefined : 8, right: isRTL ? 8 : undefined }]}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.verifiedBlue} />
            <CustomText tx="verified" style={styles.verifiedText} />
          </CustomView>
        )}
      </View>

      <View style={styles.content}>
        <CustomText style={styles.price}>
          {priceText}
        </CustomText>

        <CustomText style={styles.title} numberOfLines={2}>
          {ad.title}
        </CustomText>

        <CustomView row style={[styles.specsRow]}>
          {specs.map((spec, idx) => (
            <CustomView row key={idx} style={[styles.specItem]}>
              <Ionicons
                name={SPEC_ICONS[spec.attribute]}
                size={14}
                color="#888"
                style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }}
              />
              <CustomText style={styles.specText}>
                {isRTL ? (spec.formattedValue_l1 || spec.formattedValue) : spec.formattedValue}
              </CustomText>
            </CustomView>
          ))}
        </CustomView>

        <CustomText style={styles.location}>
          {ad.location.name}, Lebanon
        </CustomText>
        <CustomText style={styles.timestamp}>
          {timeAgo(ad.timestamp, languageStore.lang)}
        </CustomText>

        {!horizontal && (
          <>
            <View style={styles.divider} />
            <CustomView row style={styles.actionRow}>
              <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
                <Ionicons name="logo-whatsapp" size={18} color={COLORS.whatsappIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Ionicons name="call-outline" size={18} color="#000" />
                <CustomText tx="call" style={styles.callButtonText} />
              </TouchableOpacity>
            </CustomView>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eliteCardMargin: {
    borderColor: '#d4af3733',
  },
  horizontalContainer: {
    width: CARD_WIDTH,
    marginRight: SPACING.md,
  },
  verticalContainer: {
    width: '100%',
  },
  eliteHeader: {
    backgroundColor: '#E6B333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  eliteHeaderText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase',
  },
  imageWrapper: {
    height: 180,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F5FEcc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.verifiedBlue,
  },
  verifiedText: {
    fontSize: 10,
    color: COLORS.verifiedBlue,
    fontWeight: '700',
    marginLeft: 2,
  },
  content: {
    padding: SPACING.md,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  specsRow: {
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  specItem: {
    marginRight: 12,
    alignItems: 'center',
    marginBottom: 4,
  },
  specText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  location: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  whatsappButton: {
    flex: 1,
    backgroundColor: COLORS.whatsappGreen,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#000',
    height: 38,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});

export default AdCard;
