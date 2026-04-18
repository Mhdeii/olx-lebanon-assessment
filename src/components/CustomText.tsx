import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { t } from '../i18n/t';
import { TranslationKey } from '../i18n/strings';
import { languageStore } from '../store/language.store';

export interface CustomTextProps extends TextProps {
  tx?: TranslationKey;
  txOptions?: Record<string, string | number>;
  children?: React.ReactNode;
}

export const CustomText = observer(({ tx, txOptions, children, style, ...rest }: CustomTextProps) => {
  const i18nText = tx ? t(tx, txOptions) : children;
  const isRTL = languageStore.isRTL;
  
  return (
    <Text 
      style={[
        styles.defaultText,
        isRTL && styles.rtlText,
        style
      ]} 
      {...rest}
    >
      {i18nText}
    </Text>
  );
});

const styles = StyleSheet.create({
  defaultText: {
    // Default system font
  },
  rtlText: {
    // Optional: map to a specific Arabic font family if needed
    // fontFamily: 'Tajawal-Regular',
    writingDirection: 'rtl',
  }
});
