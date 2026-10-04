import { Platform, TextStyle } from 'react-native';

/**
 * JobKamer Design System - Typography Tokens
 */

export const FontFamily = Platform.select({
  ios: {
    sans: 'System',
    mono: 'Courier',
  },
  android: {
    sans: 'Roboto',
    mono: 'monospace',
  },
  default: {
    sans: 'var(--font-display, system-ui, sans-serif)',
    mono: 'var(--font-mono, monospace)',
  },
});

export const FontSize = {
  caption: 12,
  label: 12,
  bodySmall: 14,
  body: 16,
  button: 15,
  h3: 18,
  h2: 22,
  h1: 28,
  display: 34,
} as const;

export type FontSizeToken = keyof typeof FontSize;

export const FontWeight: Record<string, TextStyle['fontWeight']> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const LineHeight = {
  caption: 16,
  label: 16,
  bodySmall: 20,
  body: 24,
  button: 22,
  h3: 26,
  h2: 30,
  h1: 36,
  display: 42,
} as const;

export type LineHeightToken = keyof typeof LineHeight;

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

export interface TypographyTokenStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle['fontWeight'];
  letterSpacing?: number;
  textTransform?: TextStyle['textTransform'];
}

export const Typography: Record<TypographyVariant, TypographyTokenStyle> = {
  display: {
    fontSize: FontSize.display,
    lineHeight: LineHeight.display,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: FontSize.h1,
    lineHeight: LineHeight.h1,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: FontSize.h2,
    lineHeight: LineHeight.h2,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: FontSize.h3,
    lineHeight: LineHeight.h3,
    fontWeight: FontWeight.semibold,
  },
  body: {
    fontSize: FontSize.body,
    lineHeight: LineHeight.body,
    fontWeight: FontWeight.normal,
  },
  bodySmall: {
    fontSize: FontSize.bodySmall,
    lineHeight: LineHeight.bodySmall,
    fontWeight: FontWeight.normal,
  },
  caption: {
    fontSize: FontSize.caption,
    lineHeight: LineHeight.caption,
    fontWeight: FontWeight.normal,
  },
  label: {
    fontSize: FontSize.label,
    lineHeight: LineHeight.label,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: FontSize.button,
    lineHeight: LineHeight.button,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.2,
  },
};
