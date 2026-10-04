import { Platform, ViewStyle } from 'react-native';

/**
 * JobKamer Design System - Elevation & Shadows
 * Cohesive abstraction across iOS, Android, and Web
 */

export type ElevationLevel = 'none' | 'sm' | 'md' | 'lg';

export interface ElevationStyle extends ViewStyle {
  elevation?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export const Shadows: Record<ElevationLevel, ElevationStyle> = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  sm: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
    }),
  },
  md: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
    }),
  },
  lg: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
    }),
  },
};

/**
 * Returns an elevation style tailored for the active color scheme.
 * In Dark Mode, Android elevation can lighten surfaces slightly, while iOS needs higher opacity.
 */
export function getElevation(level: ElevationLevel = 'sm', isDark = false): ElevationStyle {
  if (level === 'none') return Shadows.none;

  const base = Shadows[level];
  if (isDark) {
    return {
      ...base,
      shadowColor: '#000000',
      shadowOpacity: (base.shadowOpacity ?? 0.1) * 2,
    };
  }
  return base;
}
