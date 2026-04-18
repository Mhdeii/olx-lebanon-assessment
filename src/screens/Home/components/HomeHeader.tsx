import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../../../store/language.store';
import { t } from '../../../i18n/t';
import { CustomView } from '../../../components/CustomView';
import { COLORS } from '../../../constants/colors';
import { SPACING } from '../../../constants/spacing';
import { CustomText } from '../../../components/CustomText';


interface HomeHeaderProps {
  location: string;
  onSearch: (query: string) => void;
  onLocationPress: () => void;
}


const HomeHeader: React.FC<HomeHeaderProps> = observer(({
  location,
  onSearch,
  onLocationPress,
}) => {
  const isRTL = languageStore.isRTL;

  return (
    <View style={styles.container}>
      <CustomView row style={[styles.locationContainer]}>
        <Ionicons name="location" size={20} color={COLORS.primary} />
        <CustomText style={styles.locationValue} numberOfLines={1}>
          {location}
        </CustomText>
        <Ionicons name="chevron-down" size={16} color="#333" style={{ marginHorizontal: 4 }} />
      </CustomView>

      <CustomView row style={[styles.searchContainer]}>
        <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={{ marginHorizontal: SPACING.xs }} />
        <TextInput
          style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
          placeholder={t('search_placeholder')}
          placeholderTextColor={COLORS.textSecondary}
          onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
        />
      </CustomView>

    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 44,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    height: '100%',
    paddingVertical: 0,
  },
});

export default HomeHeader;
