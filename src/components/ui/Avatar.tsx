import React, { useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { useAppTheme } from '@/hooks/useAppTheme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'none';

export interface AvatarProps {
  source?: string | ImageSource | null;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  fallbackIcon?: React.ReactNode;
  style?: ViewStyle;
  className?: string;
  accessibilityLabel?: string;
}

export function Avatar({
  source,
  name,
  size = 'md',
  shape = 'circle',
  status = 'none',
  fallbackIcon,
  style,
  className,
  accessibilityLabel,
}: AvatarProps) {
  const { colors, radius, typography } = useAppTheme();
  const [imageError, setImageError] = useState(false);

  const sizePixels = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  }[size];

  const fontSize = {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 22,
    xl: 28,
  }[size];

  const statusDotSize = Math.max(8, Math.round(sizePixels * 0.25));

  const getInitials = (text?: string): string => {
    if (!text) return 'JK';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const borderRadius = shape === 'circle' ? radius.full : radius.md;

  const resolvedSource = typeof source === 'string' ? { uri: source } : source;
  const hasValidImage = Boolean(source) && !imageError;

  const statusColors = {
    online: colors.success,
    offline: colors.textDisabled,
    busy: colors.error,
    none: 'transparent',
  }[status];

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name ?? 'Avatar'}
      style={[
        styles.container,
        {
          width: sizePixels,
          height: sizePixels,
        },
        style,
      ]}
      className={className}>
      <View
        style={[
          styles.inner,
          {
            width: sizePixels,
            height: sizePixels,
            borderRadius,
            backgroundColor: colors.infoLight,
            borderColor: colors.border,
            borderWidth: 1,
          },
        ]}>
        {hasValidImage ? (
          <Image
            source={resolvedSource}
            style={{ width: sizePixels, height: sizePixels, borderRadius }}
            contentFit="cover"
            onError={() => setImageError(true)}
          />
        ) : fallbackIcon ? (
          fallbackIcon
        ) : (
          <Text
            style={[
              styles.initials,
              {
                color: colors.primary,
                fontSize,
                fontWeight: typography.label.fontWeight,
              },
            ]}>
            {getInitials(name)}
          </Text>
        )}
      </View>

      {status !== 'none' && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusDotSize,
              height: statusDotSize,
              borderRadius: statusDotSize / 2,
              backgroundColor: statusColors,
              borderColor: colors.surface,
              borderWidth: 1.5,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statusDot: {
    position: 'absolute',
  },
});
