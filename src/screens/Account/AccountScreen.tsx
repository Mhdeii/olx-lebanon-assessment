import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { CustomText } from '../../components/CustomText';
import { CustomView } from '../../components/CustomView';
import { languageStore } from '../../store/language.store';
import { LanguageToggle } from '../../components/LanguageToggle';

const { width } = Dimensions.get('window');

const AccountScreen = observer(() => {
  const isRTL = languageStore.isRTL;

  const renderSettingItem = (icon: string, labelTx: any, onPress?: () => void, rightElement?: React.ReactNode) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <CustomView row style={styles.settingItemInner}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={icon} size={22} color={COLORS.black} />
        </View>
        <View style={styles.settingLabelContainer}>
          <CustomText tx={labelTx} style={styles.settingLabel} />
        </View>
        {rightElement || (
          <Ionicons
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={18}
            color="#999"
          />
        )}
      </CustomView>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


      <View style={styles.content}>



        <View style={styles.card}>
          <CustomText tx="settings" style={styles.cardTitle} />
          {renderSettingItem(
            "language-outline",
            "language",
            undefined,
            <LanguageToggle />
          )}
        </View>


        <View style={styles.footerInfo}>
          <CustomText style={styles.versionText}>Version 1.0.0 (Build 2024.1)</CustomText>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F0F0F0',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#002f34',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  editProfileBtn: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 14,
    color: '#002f34',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  content: {
    padding: SPACING.md,
    marginTop: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    paddingHorizontal: 4,
  },
  settingItem: {
    paddingVertical: 12,
  },
  settingItemInner: {
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabelContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
    height: 54,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '700',
  },
  footerInfo: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default AccountScreen;
