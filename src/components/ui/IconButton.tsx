import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<PressableProps, 'style'> {
  icon: React.ReactNode;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  style?: ViewStyle;
  className?: string;
}

export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  disabled,
  style,
  className,
  ...rest
}: IconButtonProps) {
  const { colors, radius, layout } = useAppTheme();

  const isInteractive = !disabled && !isLoading;

  const sizePixels = {
    sm: 36,
    md: layout.minTouchTarget, // 44px
    lg: 52,
  }[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: disabled ? colors.backgroundElement : colors.primary,
          border: 'transparent',
          loaderColor: colors.primaryForeground,
        };
      case 'secondary':
        return {
          bg: disabled ? colors.backgroundElement : colors.secondary,
          border: 'transparent',
          loaderColor: colors.secondaryForeground,
        };
      case 'outline':
        return {
          bg: 'transparent',
          border: disabled ? colors.border : colors.primary,
          loaderColor: colors.primary,
        };
      case 'danger':
        return {
          bg: disabled ? colors.backgroundElement : colors.error,
          border: 'transparent',
          loaderColor: '#FFFFFF',
        };
      case 'ghost':
      default:
        return {
          bg: 'transparent',
          border: 'transparent',
          loaderColor: colors.text,
        };
    }
  };

  const vStyle = getVariantStyles();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        disabled: !isInteractive,
        busy: isLoading,
      }}
      disabled={!isInteractive}
      hitSlop={size === 'sm' ? { top: 6, bottom: 6, left: 6, right: 6 } : undefined}
      style={({ pressed }) => [
        styles.base,
        {
          width: sizePixels,
          height: sizePixels,
          borderRadius: radius.md,
          backgroundColor: pressed && isInteractive ? colors.backgroundSelected : vStyle.bg,
          borderColor: vStyle.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
      className={className}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={vStyle.loaderColor} />
      ) : (
        icon
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
