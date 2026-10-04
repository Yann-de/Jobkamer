import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type CardVariant = 'default' | 'elevated' | 'flat' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
}

export function Card({
  style,
  variant = 'default',
  padding = 'md',
  interactive = false,
  onPress,
  disabled = false,
  className,
  children,
  ...rest
}: CardProps) {
  const { colors, radius, spacing, elevation } = useAppTheme();

  const paddingStyle = {
    none: 0,
    sm: spacing.sm,
    md: spacing.lg,
    lg: spacing.xl,
  }[padding];

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.borderMuted,
          borderWidth: 1,
          ...elevation('sm'),
        };
      case 'flat':
        return {
          backgroundColor: colors.backgroundElement,
          borderWidth: 0,
        };
      case 'outlined':
      case 'default':
      default:
        return {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
        };
    }
  };

  const cardStyle: ViewStyle = {
    borderRadius: radius.lg,
    padding: paddingStyle,
    ...getVariantStyle(),
    ...style,
  };

  if (interactive && onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          cardStyle,
          pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.99 }] },
          disabled && { opacity: 0.6 },
        ]}
        className={className}
        {...rest}>
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, cardStyle]} className={className} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
