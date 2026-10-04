import { useColorScheme } from './useColorScheme';
import { useThemeStore } from '@/stores';
import { AppTheme, ColorScheme, getTheme } from '@/theme';

export interface UseAppThemeResult extends AppTheme {
  themeMode: 'system' | 'light' | 'dark';
  colorScheme: ColorScheme;
  setThemeMode: (mode: 'system' | 'light' | 'dark') => void;
}

export function useAppTheme(): UseAppThemeResult {
  const { themeMode, setThemeMode } = useThemeStore();
  const systemScheme = useColorScheme();

  const resolvedScheme: ColorScheme =
    themeMode === 'system' ? systemScheme : themeMode;

  const theme = getTheme(resolvedScheme);

  return {
    ...theme,
    themeMode,
    colorScheme: resolvedScheme,
    setThemeMode,
  };
}
