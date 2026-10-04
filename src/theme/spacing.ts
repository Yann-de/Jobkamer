import { Platform } from 'react-native';

/**
 * JobKamer Design System - Spacing Scale
 */
export const Spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  // Helper layout scales
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export type SpacingToken = keyof typeof Spacing;

/**
 * JobKamer Design System - Radius Scale
 */
export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof Radius;

export const Layout = {
  maxContentWidth: 768,
  minTouchTarget: 44,
  tabBarHeight: Platform.select({ ios: 60, default: 64 }),
  bottomInset: Platform.select({ ios: 28, android: 16, default: 0 }),
} as const;
