import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, containerStyle, style, ...rest }, ref) => {
    const { colors, radius, spacing, typography } = useAppTheme();

    const hasError = Boolean(error);

    return (
      <View style={[styles.container, containerStyle]}>
        {Boolean(label) && (
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                marginBottom: spacing.xs,
              },
            ]}>
            {label}
          </Text>
        )}

        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.backgroundSubtle,
              borderColor: hasError ? colors.error : colors.border,
              borderRadius: radius.md,
              paddingHorizontal: spacing.md,
            },
          ]}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                color: colors.text,
                fontSize: typography.fontSize.base,
                paddingVertical: spacing.md,
              },
              style,
            ]}
            {...rest}
          />

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>

        {hasError ? (
          <Text
            style={[
              styles.errorText,
              {
                color: colors.error,
                fontSize: typography.fontSize.xs,
                marginTop: spacing.xs,
              },
            ]}>
            {error}
          </Text>
        ) : helperText ? (
          <Text
            style={[
              styles.helperText,
              {
                color: colors.textMuted,
                fontSize: typography.fontSize.xs,
                marginTop: spacing.xs,
              },
            ]}>
            {helperText}
          </Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  errorText: {},
  helperText: {},
});
