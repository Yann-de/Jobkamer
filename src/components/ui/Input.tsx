import React, { useState } from 'react';
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
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      disabled = false,
      leftIcon,
      rightIcon,
      containerStyle,
      style,
      onFocus,
      onBlur,
      editable = true,
      ...rest
    },
    ref
  ) => {
    const { colors, radius, spacing, typography, layout } = useAppTheme();
    const [isFocused, setIsFocused] = useState(false);

    const isEditable = editable && !disabled;
    const hasError = Boolean(error);

    const handleFocus: TextInputProps['onFocus'] = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Determine border and background colors based on state
    const getBorderColor = () => {
      if (hasError) return colors.error;
      if (isFocused) return colors.primary;
      return colors.border;
    };

    const getBackgroundColor = () => {
      if (!isEditable) return colors.backgroundElement;
      if (isFocused) return colors.surface;
      return colors.surface;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {Boolean(label) && (
          <Text
            style={[
              styles.label,
              {
                color: hasError
                  ? colors.error
                  : isFocused
                  ? colors.primary
                  : colors.text,
                fontSize: typography.bodySmall.fontSize,
                fontWeight: typography.label.fontWeight,
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
              backgroundColor: getBackgroundColor(),
              borderColor: getBorderColor(),
              borderWidth: isFocused ? 1.5 : 1,
              borderRadius: radius.md,
              paddingHorizontal: spacing.md,
              minHeight: layout.minTouchTarget,
              opacity: !isEditable ? 0.6 : 1,
            },
          ]}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            editable={isEditable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.textDisabled}
            selectionColor={colors.primary}
            accessibilityState={{ disabled: !isEditable }}
            accessibilityLabel={label}
            style={[
              styles.input,
              {
                color: isEditable ? colors.text : colors.textDisabled,
                fontSize: typography.body.fontSize,
                paddingVertical: spacing.sm,
              },
              style,
            ]}
            {...rest}
          />

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>

        {hasError ? (
          <Text
            accessibilityRole="alert"
            style={[
              styles.helperText,
              {
                color: colors.error,
                fontSize: typography.caption.fontSize,
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
                color: colors.textSecondary,
                fontSize: typography.caption.fontSize,
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
  },
  input: {
    flex: 1,
  },
  iconLeft: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {},
});
