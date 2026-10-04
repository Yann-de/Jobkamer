import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  className?: string;
}

export function Badge({ label, variant = 'primary', style, className }: BadgeProps) {
  const { colors, radius, spacing, typography } = useAppTheme();

  const variantStyles = {
    primary: {
      bg: colors.backgroundElement,
      text: colors.primary,
    },
    secondary: {
      bg: colors.backgroundSelected,
      text: colors.textSecondary,
    },
    success: {
      bg: '#ecfdf5',
      text: colors.success,
    },
    warning: {
      bg: '#fffbeb',
      text: colors.warning,
    },
    info: {
      bg: '#f0f9ff',
      text: colors.info,
    },
  }[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.bg,
          borderRadius: radius.full,
          paddingVertical: spacing.xxs,
          paddingHorizontal: spacing.sm,
        },
        style,
      ]}
      className={className}>
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.text,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
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
  },
  text: {
    letterSpacing: 0.2,
  },
});
