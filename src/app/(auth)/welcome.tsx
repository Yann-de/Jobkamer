import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Container, Button } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function WelcomeScreen() {
  const { spacing, colors } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Container useSafeArea centerContent padding="lg" style={styles.container}>
      <View style={styles.content}>
        {/* Brand Section */}
        <View style={styles.brandSection}>
          <ThemedText
            variant="display"
            colorToken="primary"
            style={styles.logoText}>
            JobKamer
          </ThemedText>
          <ThemedText
            variant="body"
            colorToken="textSecondary"
            style={styles.taglineText}>
            {t('auth.welcome.tagline')}
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionsSection, { gap: spacing.md }]}>
          <Button
            title={t('auth.welcome.loginButton')}
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/(auth)/login')}
            accessibilityLabel={t('auth.welcome.loginButton')}
          />
          <Button
            title={t('auth.welcome.registerButton')}
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => router.push('/(auth)/register')}
            accessibilityLabel={t('auth.welcome.registerButton')}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  logoText: {
    letterSpacing: -1,
    textAlign: 'center',
  },
  taglineText: {
    textAlign: 'center',
    maxWidth: 280,
  },
  actionsSection: {
    width: '100%',
  },
});
