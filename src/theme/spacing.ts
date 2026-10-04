import { Platform } from 'react-native';

export const Spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const Radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const Layout = {
  maxContentWidth: 768,
  tabBarHeight: Platform.select({ ios: 60, default: 64 }),
  bottomInset: Platform.select({ ios: 28, android: 16, default: 0 }),
} as const;
