import React from 'react';
import {View, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SPACING, BORDER_RADIUS} from '../../constants/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({children, style, onPress, shadow = true}) => {
  const Container = (onPress ? TouchableOpacity : View) as any;

  return (
    <Container 
      activeOpacity={0.9} 
      onPress={onPress} 
      style={[styles.card, shadow && styles.shadow, style]}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
