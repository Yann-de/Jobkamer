import { Colors, ColorToken, ThemeColors } from './colors';
import { Layout, Radius, RadiusToken, Spacing, SpacingToken } from './spacing';
import {
  FontFamily,
  FontSize,
  FontSizeToken,
  FontWeight,
  LineHeight,
  LineHeightToken,
  Typography,
  TypographyTokenStyle,
  TypographyVariant,
} from './typography';
import { ElevationLevel, ElevationStyle, getElevation, Shadows } from './shadows';

export {
  Colors,
  Spacing,
  Radius,
  Layout,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Typography,
  Shadows,
  getElevation,
};

export type {
  ColorToken,
  ThemeColors,
  SpacingToken,
  RadiusToken,
  FontSizeToken,
  LineHeightToken,
  TypographyVariant,
  TypographyTokenStyle,
  ElevationLevel,
  ElevationStyle,
};

export type ColorScheme = 'light' | 'dark';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface AppTheme {
  colors: ThemeColors;
  spacing: typeof Spacing;
  radius: typeof Radius;
  typography: typeof Typography;
  layout: typeof Layout;
  elevation: (level: ElevationLevel) => ElevationStyle;
  isDark: boolean;
}

export function getTheme(mode: ColorScheme): AppTheme {
  const isDark = mode === 'dark';
  return {
    colors: isDark ? Colors.dark : Colors.light,
    spacing: Spacing,
    radius: Radius,
    typography: Typography,
    layout: Layout,
    elevation: (level: ElevationLevel) => getElevation(level, isDark),
    isDark,
  };
}
