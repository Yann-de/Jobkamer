import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function Badge({
  label,
  variant = 'default',
  size = 'md',
  icon,
  style,
  className,
}: BadgeProps) {
  const { colors, radius, spacing, typography } = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: colors.successLight,
          text: colors.success,
          border: 'transparent',
        };
      case 'warning':
        return {
          bg: colors.warningLight,
          text: colors.warning,
          border: 'transparent',
        };
      case 'error':
        return {
          bg: colors.errorLight,
          text: colors.error,
          border: 'transparent',
        };
      case 'info':
        return {
          bg: colors.infoLight,
          text: colors.info,
          border: 'transparent',
        };
      case 'neutral':
      case 'secondary':
        return {
          bg: colors.backgroundElement,
          text: colors.textSecondary,
          border: colors.borderMuted,
        };
      case 'default':
      case 'primary':
      default:
        return {
          bg: colors.infoLight,
          text: colors.primary,
          border: 'transparent',
        };
    }
  };

  const vStyle = getVariantStyles();

  const sizeStyles = {
    sm: {
      paddingVertical: 2,
      paddingHorizontal: spacing.xs + 2,
      fontSize: typography.caption.fontSize - 1,
      gap: 4,
    },
    md: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm + 2,
      fontSize: typography.caption.fontSize,
      gap: 6,
    },
  }[size];

  return (
    <View
      accessibilityRole="text"
      style={[
        styles.badge,
        {
          backgroundColor: vStyle.bg,
          borderColor: vStyle.border,
          borderWidth: vStyle.border !== 'transparent' ? 1 : 0,
          borderRadius: radius.full,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          gap: sizeStyles.gap,
        },
        style,
      ]}
      className={className}>
      {icon}
      <Text
        style={[
          styles.text,
          {
            color: vStyle.text,
            fontSize: sizeStyles.fontSize,
            fontWeight: typography.label.fontWeight,
          },
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    letterSpacing: 0.2,
  },
});
