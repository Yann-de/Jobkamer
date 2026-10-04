import { Text, type TextProps, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { ColorToken } from '@/theme';

export type ThemedTextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyBold'
  | 'caption'
  | 'captionBold'
  | 'link'
  | 'label';

export type ThemedTextProps = TextProps & {
  variant?: ThemedTextVariant;
  colorToken?: ColorToken;
  className?: string;
};

export function ThemedText({
  style,
  variant = 'body',
  colorToken,
  className,
  ...rest
}: ThemedTextProps) {
  const { colors, typography } = useAppTheme();

  const variantStyles = {
    h1: {
      fontSize: typography.fontSize['3xl'],
      lineHeight: typography.lineHeight['3xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    h2: {
      fontSize: typography.fontSize['2xl'],
      lineHeight: typography.lineHeight['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text,
    },
    h3: {
      fontSize: typography.fontSize.xl,
      lineHeight: typography.lineHeight.xl,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text,
    },
    body: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.base,
      fontWeight: typography.fontWeight.normal,
      color: colors.text,
    },
    bodyBold: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.base,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text,
    },
    caption: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.sm,
      fontWeight: typography.fontWeight.normal,
      color: colors.textSecondary,
    },
    captionBold: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.sm,
      fontWeight: typography.fontWeight.semibold,
      color: colors.textSecondary,
    },
    link: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.primary,
    },
    label: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.xs,
      fontWeight: typography.fontWeight.medium,
      color: colors.textMuted,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
  }[variant];

  const resolvedColor = colorToken ? colors[colorToken] : variantStyles.color;

  return (
    <Text
      style={[variantStyles, { color: resolvedColor }, style]}
      className={className}
      {...rest}
    />
  );
}
