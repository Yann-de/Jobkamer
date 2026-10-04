import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  className,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const { colors, radius, spacing, typography, layout } = useAppTheme();

  const isInteractive = !disabled && !isLoading;

  const sizeStyles = {
    sm: {
      minHeight: 36,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      fontSize: typography.button.fontSize - 1,
      gap: spacing.xs,
    },
    md: {
      minHeight: layout.minTouchTarget, // 44px accessible touch target
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      fontSize: typography.button.fontSize,
      gap: spacing.sm,
    },
    lg: {
      minHeight: 52,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      fontSize: typography.button.fontSize + 1,
      gap: spacing.md,
    },
  }[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: disabled ? colors.backgroundElement : colors.primary,
          text: disabled ? colors.textDisabled : colors.primaryForeground,
          border: 'transparent',
          loaderColor: colors.primaryForeground,
        };
      case 'secondary':
        return {
          bg: disabled ? colors.backgroundElement : colors.secondary,
          text: disabled ? colors.textDisabled : colors.secondaryForeground,
          border: 'transparent',
          loaderColor: colors.secondaryForeground,
        };
      case 'outline':
        return {
          bg: 'transparent',
          text: disabled ? colors.textDisabled : colors.primary,
          border: disabled ? colors.border : colors.primary,
          loaderColor: colors.primary,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          text: disabled ? colors.textDisabled : colors.text,
          border: 'transparent',
          loaderColor: colors.text,
        };
      case 'danger':
        return {
          bg: disabled ? colors.backgroundElement : colors.error,
          text: disabled ? colors.textDisabled : '#FFFFFF',
          border: 'transparent',
          loaderColor: '#FFFFFF',
        };
    }
  };

  const vStyle = getVariantStyles();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{
        disabled: !isInteractive,
        busy: isLoading,
      }}
      disabled={!isInteractive}
      hitSlop={size === 'sm' ? { top: 6, bottom: 6, left: 6, right: 6 } : undefined}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: sizeStyles.minHeight,
          backgroundColor: pressed && isInteractive ? (variant === 'primary' ? colors.primaryDark : vStyle.bg) : vStyle.bg,
          borderColor: vStyle.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderRadius: radius.md,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          gap: sizeStyles.gap,
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      className={className}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={vStyle.loaderColor} />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.text,
              {
                color: vStyle.text,
                fontSize: sizeStyles.fontSize,
                fontWeight: typography.button.fontWeight,
                letterSpacing: typography.button.letterSpacing,
              },
            ]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
