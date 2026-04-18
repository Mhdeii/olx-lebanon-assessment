import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../store/language.store';

export const LanguageToggle = observer(() => {
  const isArabic = languageStore.isRTL;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => languageStore.toggleLanguage()}
      activeOpacity={0.8}
    >
      <View style={[styles.pill, !isArabic && styles.activePill]}>
        <Text style={[styles.text, !isArabic && styles.activeText]}>EN</Text>
      </View>
      <View style={[styles.pill, isArabic && styles.activePill]}>
        <Text style={[styles.text, isArabic && styles.activeText]}>عربي</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    padding: 2,
    alignSelf: 'flex-start',
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  activePill: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
  },
  activeText: {
    color: '#002f34', // OLX brand color
  },
});
