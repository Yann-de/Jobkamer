import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ColorScheme } from '@/theme';

export function useColorScheme(): ColorScheme {
  const [hasHydrated, setHasHydrated] = useState(false);
  const systemScheme = useRNColorScheme();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return 'light';
  }

  return systemScheme === 'dark' ? 'dark' : 'light';
}
