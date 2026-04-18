import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { CustomText } from '../CustomText';
import { CustomView } from '../CustomView';


const BottomNavBar = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <CustomView row style={styles.container}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.iconContainer}>
            <Text style={styles.iconHome}>🏠</Text>
          </Text>
          <CustomText tx="home" style={[styles.label, styles.activeLabel]} />
          <View style={styles.activeIndicator} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Text style={styles.iconContainer}>
            <Text style={styles.icon}>💬</Text>
          </Text>
          <CustomText tx="chats" style={styles.label} />
        </TouchableOpacity>

        <View style={styles.sellTabContainer}>
          <TouchableOpacity style={styles.sellButton}>
            <Text style={styles.sellIcon}>+</Text>
          </TouchableOpacity>
          <CustomText tx="sell" style={styles.label} />
        </View>

        <TouchableOpacity style={styles.tab}>
          <Text style={styles.iconContainer}>
            <Text style={styles.icon}>📄</Text>
          </Text>
          <CustomText tx="my_ads" style={styles.label} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Text style={styles.iconContainer}>
            <Text style={styles.icon}>👤</Text>
          </Text>
          <CustomText tx="account" style={styles.label} />
        </TouchableOpacity>
      </CustomView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  sellTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  sellButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  sellIcon: {
    fontSize: 28,
    color: '#000',
    fontWeight: '300',
  },
  iconContainer: {
    marginBottom: 4,
  },
  iconHome: {
    fontSize: 22,
    color: '#000',
  },
  icon: {
    fontSize: 22,
    color: '#666',
    opacity: 0.8,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
  },
  activeLabel: {
    color: '#000',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: '#000',
  },
});

export default BottomNavBar;
