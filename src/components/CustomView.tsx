import React from 'react';
import { View, ViewProps } from 'react-native';
import { observer } from 'mobx-react-lite';
import { languageStore } from '../store/language.store';

export interface CustomViewProps extends ViewProps {
  row?: boolean;
}

export const CustomView = observer(({ style, row, ...rest }: CustomViewProps) => {
  const isRTL = languageStore.isRTL;
  
  return (
    <View 
      style={[
        row && { flexDirection: isRTL ? 'row-reverse' : 'row' },
        style
      ]} 
      {...rest}
    />
  );
});
