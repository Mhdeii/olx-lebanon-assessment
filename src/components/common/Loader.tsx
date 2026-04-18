import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SPACING} from '../../constants/spacing';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  message: {
    marginTop: SPACING.md,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default Loader;
