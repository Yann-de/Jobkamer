import { View, type ViewProps } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { ColorToken } from '@/theme';

export type ThemedViewProps = ViewProps & {
  colorToken?: ColorToken;
  className?: string;
};

export function ThemedView({
  style,
  colorToken = 'background',
  className,
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[{ backgroundColor: colors[colorToken] }, style]}
      className={className}
      {...otherProps}
    />
  );
}
