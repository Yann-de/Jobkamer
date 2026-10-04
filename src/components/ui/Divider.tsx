import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  label?: string;
  spacing?: number;
  color?: string;
  style?: ViewStyle;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  thickness = 1,
  label,
  spacing: customSpacing,
  color,
  style,
  className,
}: DividerProps) {
  const { colors, spacing, typography } = useAppTheme();

  const lineColor = color ?? colors.border;
  const margin = customSpacing ?? spacing.md;

  if (orientation === 'vertical') {
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={[
          styles.vertical,
          {
            width: thickness,
            backgroundColor: lineColor,
            marginHorizontal: margin,
          },
          style,
        ]}
        className={className}
      />
    );
  }

  if (label) {
    return (
      <View
        accessibilityRole="none"
        style={[
          styles.labelContainer,
          {
            marginVertical: margin,
          },
          style,
        ]}
        className={className}>
        <View style={[styles.line, { height: thickness, backgroundColor: lineColor }]} />
        <Text
          style={[
            styles.labelText,
            {
              color: colors.textSecondary,
              fontSize: typography.caption.fontSize,
              paddingHorizontal: spacing.sm,
            },
          ]}>
          {label}
        </Text>
        <View style={[styles.line, { height: thickness, backgroundColor: lineColor }]} />
      </View>
    );
  }

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        styles.horizontal,
        {
          height: thickness,
          backgroundColor: lineColor,
          marginVertical: margin,
        },
        style,
      ]}
      className={className}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
    alignSelf: 'stretch',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
  },
  labelText: {
    textAlign: 'center',
  },
});
