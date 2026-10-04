import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, TextStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { ColorToken, Typography, TypographyVariant } from '@/theme';

export type TextVariant =
  | TypographyVariant
  | 'bodyBold'
  | 'bodySmallBold'
  | 'captionBold'
  | 'link';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  colorToken?: ColorToken;
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
  className?: string;
  children?: React.ReactNode;
}

export function ThemedText({
  style,
  variant = 'body',
  colorToken,
  align,
  weight,
  className,
  accessibilityRole,
  ...rest
}: TextProps) {
  const { colors, typography } = useAppTheme();

  // Resolve base typography token
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'display':
        return {
          fontSize: typography.display.fontSize,
          lineHeight: typography.display.lineHeight,
          fontWeight: typography.display.fontWeight,
          letterSpacing: typography.display.letterSpacing,
        };
      case 'h1':
        return {
          fontSize: typography.h1.fontSize,
          lineHeight: typography.h1.lineHeight,
          fontWeight: typography.h1.fontWeight,
          letterSpacing: typography.h1.letterSpacing,
        };
      case 'h2':
        return {
          fontSize: typography.h2.fontSize,
          lineHeight: typography.h2.lineHeight,
          fontWeight: typography.h2.fontWeight,
          letterSpacing: typography.h2.letterSpacing,
        };
      case 'h3':
        return {
          fontSize: typography.h3.fontSize,
          lineHeight: typography.h3.lineHeight,
          fontWeight: typography.h3.fontWeight,
        };
      case 'body':
        return {
          fontSize: typography.body.fontSize,
          lineHeight: typography.body.lineHeight,
          fontWeight: typography.body.fontWeight,
        };
      case 'bodyBold':
        return {
          fontSize: typography.body.fontSize,
          lineHeight: typography.body.lineHeight,
          fontWeight: '700',
        };
      case 'bodySmall':
        return {
          fontSize: typography.bodySmall.fontSize,
          lineHeight: typography.bodySmall.lineHeight,
          fontWeight: typography.bodySmall.fontWeight,
        };
      case 'bodySmallBold':
        return {
          fontSize: typography.bodySmall.fontSize,
          lineHeight: typography.bodySmall.lineHeight,
          fontWeight: '700',
        };
      case 'caption':
        return {
          fontSize: typography.caption.fontSize,
          lineHeight: typography.caption.lineHeight,
          fontWeight: typography.caption.fontWeight,
        };
      case 'captionBold':
        return {
          fontSize: typography.caption.fontSize,
          lineHeight: typography.caption.lineHeight,
          fontWeight: '700',
        };
      case 'label':
        return {
          fontSize: typography.label.fontSize,
          lineHeight: typography.label.lineHeight,
          fontWeight: typography.label.fontWeight,
          letterSpacing: typography.label.letterSpacing,
          textTransform: typography.label.textTransform,
        };
      case 'button':
        return {
          fontSize: typography.button.fontSize,
          lineHeight: typography.button.lineHeight,
          fontWeight: typography.button.fontWeight,
          letterSpacing: typography.button.letterSpacing,
        };
      case 'link':
        return {
          fontSize: typography.bodySmall.fontSize,
          lineHeight: typography.bodySmall.lineHeight,
          fontWeight: '600',
        };
    }
  };

  const variantStyle = getVariantStyle();

  // Default color depending on variant
  const getDefaultColor = () => {
    if (variant === 'link') return colors.primary;
    if (variant === 'caption' || variant === 'bodySmall') return colors.textSecondary;
    if (variant === 'label') return colors.textSecondary;
    return colors.text;
  };

  const resolvedColor = colorToken ? colors[colorToken] : getDefaultColor();

  // Accessibility header role inference
  const defaultA11yRole =
    variant === 'display' || variant === 'h1' || variant === 'h2' || variant === 'h3'
      ? 'header'
      : accessibilityRole ?? 'text';

  return (
    <RNText
      accessibilityRole={defaultA11yRole}
      style={[
        variantStyle,
        { color: resolvedColor },
        align ? { textAlign: align } : null,
        weight ? { fontWeight: weight } : null,
        style,
      ]}
      className={className}
      {...rest}
    />
  );
}

// Convenient alias for modern DS usage
export const Text = ThemedText;
export type ThemedTextProps = TextProps;
