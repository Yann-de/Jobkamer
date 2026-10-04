import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SymbolView } from 'expo-symbols';

import { Container, Card } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function PublishScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Container useSafeArea centerContent padding="lg" style={styles.container}>
      <Card variant="outlined" padding="lg" style={[styles.card, { gap: spacing.md }]}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: colors.infoLight,
              borderRadius: radius.full,
            },
          ]}>
          <SymbolView
            name={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }}
            tintColor={colors.primary}
            size={40}
          />
        </View>

        <ThemedText variant="h2" align="center" colorToken="text">
          {t('navigation.publish')}
        </ThemedText>

        <ThemedText variant="body" colorToken="textSecondary" align="center">
          Fonctionnalité disponible prochainement
        </ThemedText>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    width: '100%',
    maxWidth: 360,
  },
  iconBox: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
