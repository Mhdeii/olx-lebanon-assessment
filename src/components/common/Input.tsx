import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SPACING, BORDER_RADIUS} from '../../constants/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, !!error && styles.errorInput]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.textSecondary}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  inputContainer: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default Input;
