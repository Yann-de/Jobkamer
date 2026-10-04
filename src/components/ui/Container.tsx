import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useAppTheme } from '@/hooks/useAppTheme';

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends ViewProps {
  padding?: ContainerPadding;
  scrollable?: boolean;
  useSafeArea?: boolean;
  safeAreaEdges?: Edge[];
  centerContent?: boolean;
  contentContainerStyle?: ViewStyle;
  className?: string;
}

export function Container({
  children,
  padding = 'md',
  scrollable = false,
  useSafeArea = false,
  safeAreaEdges = ['top', 'bottom'],
  centerContent = true,
  style,
  contentContainerStyle,
  className,
  ...rest
}: ContainerProps) {
  const { colors, spacing, layout } = useAppTheme();

  const paddingValue = {
    none: 0,
    sm: spacing.sm,
    md: spacing.lg,
    lg: spacing.xl,
  }[padding];

  const innerStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    maxWidth: centerContent ? layout.maxContentWidth : undefined,
    alignSelf: centerContent ? 'center' : undefined,
    paddingHorizontal: paddingValue,
  };

  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          paddingVertical: paddingValue,
          flexGrow: 1,
        },
        contentContainerStyle,
      ]}
      style={innerStyle}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        innerStyle,
        {
          paddingVertical: paddingValue,
        },
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  if (useSafeArea) {
    return (
      <SafeAreaView
        edges={safeAreaEdges}
        style={[
          styles.container,
          { backgroundColor: colors.background },
          style,
        ]}
        className={className}
        {...rest}>
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        style,
      ]}
      className={className}
      {...rest}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
