import { Colors, ColorToken, ThemeColors } from './colors';
import { Layout, Radius, Spacing } from './spacing';
import { FontFamily, FontSize, FontWeight, LineHeight } from './typography';

export { Colors, Spacing, Radius, Layout, FontFamily, FontSize, FontWeight, LineHeight };
export type { ColorToken, ThemeColors };

export type ColorScheme = 'light' | 'dark';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface AppTheme {
  colors: ThemeColors;
  spacing: typeof Spacing;
  radius: typeof Radius;
  typography: {
    fontSize: typeof FontSize;
    lineHeight: typeof LineHeight;
    fontWeight: typeof FontWeight;
  };
  isDark: boolean;
}

export function getTheme(mode: ColorScheme): AppTheme {
  const isDark = mode === 'dark';
  return {
    colors: isDark ? Colors.dark : Colors.light,
    spacing: Spacing,
    radius: Radius,
    typography: {
      fontSize: FontSize,
      lineHeight: LineHeight,
      fontWeight: FontWeight,
    },
    isDark,
  };
}
