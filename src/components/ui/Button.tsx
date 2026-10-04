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
  leftIcon,
  rightIcon,
  disabled,
  style,
  className,
  ...rest
}: ButtonProps) {
  const { colors, radius, spacing, typography } = useAppTheme();

  const isInteractive = !disabled && !isLoading;

  const sizeStyles = {
    sm: {
      paddingVertical: spacing.xs + 2,
      paddingHorizontal: spacing.md,
      fontSize: typography.fontSize.sm,
      gap: spacing.xs,
    },
    md: {
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.base,
      fontSize: typography.fontSize.base,
      gap: spacing.sm,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      fontSize: typography.fontSize.lg,
      gap: spacing.md,
    },
  }[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: colors.primary,
          text: colors.primaryForeground,
          border: 'transparent',
        };
      case 'secondary':
        return {
          bg: colors.backgroundElement,
          text: colors.text,
          border: 'transparent',
        };
      case 'outline':
        return {
          bg: 'transparent',
          text: colors.primary,
          border: colors.border,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          text: colors.text,
          border: 'transparent',
        };
      case 'danger':
        return {
          bg: colors.error,
          text: '#ffffff',
          border: 'transparent',
        };
    }
  };

  const vStyle = getVariantStyles();

  return (
    <Pressable
      disabled={!isInteractive}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: vStyle.bg,
          borderColor: vStyle.border,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderRadius: radius.md,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          gap: sizeStyles.gap,
          opacity: !isInteractive ? 0.6 : pressed ? 0.8 : 1,
        },
        style,
      ]}
      className={className}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={vStyle.text} />
      ) : (
        <>
          {leftIcon}
          <Text
            style={[
              styles.text,
              {
                color: vStyle.text,
                fontSize: sizeStyles.fontSize,
                fontWeight: typography.fontWeight.semibold,
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
