import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  className?: string;
}

export function Card({
  style,
  variant = 'outlined',
  className,
  children,
  ...rest
}: CardProps) {
  const { colors, radius, spacing } = useAppTheme();

  const variantStyle = {
    outlined: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
    },
    elevated: {
      backgroundColor: colors.card,
      borderColor: colors.borderMuted,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    flat: {
      backgroundColor: colors.backgroundElement,
      borderWidth: 0,
      borderColor: 'transparent',
    },
  }[variant];

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: radius.lg,
          padding: spacing.base,
        },
        variantStyle,
        style,
      ]}
      className={className}
      {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
