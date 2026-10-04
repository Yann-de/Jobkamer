import { ColorScheme, ThemeColors, ThemeMode } from '@/theme';

export type { ColorScheme, ThemeColors, ThemeMode };

export interface ThemeContextValue {
  theme: ThemeColors;
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}
