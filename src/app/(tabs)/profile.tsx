import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge, Button, Card } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { APP_CONFIG } from '@/constants/config';
import { ThemeMode } from '@/theme';

export default function ProfileScreen() {
  const { spacing, themeMode, setThemeMode } = useAppTheme();
  const { t, currentLocale, switchLanguage } = useAppLanguage();

  const themeOptions: { label: string; mode: ThemeMode }[] = [
    { label: t('profile.themeSystem'), mode: 'system' },
    { label: t('profile.themeLight'), mode: 'light' },
    { label: t('profile.themeDark'), mode: 'dark' },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['4xl'] }]}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText variant="h2">{t('profile.title')}</ThemedText>
            <ThemedText variant="caption">
              Gérez votre profil professionnel et vos préférences
            </ThemedText>
          </View>

          {/* Profile Card Summary */}
          <Card variant="elevated" style={styles.profileCard}>
            <View style={styles.avatar}>
              <ThemedText variant="h2" colorToken="primaryForeground">
                JK
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText variant="h3">Utilisateur JobKamer</ThemedText>
              <ThemedText variant="caption">Candidat / Professionnel</ThemedText>
              <Badge label="Cameroun" variant="primary" style={styles.badge} />
            </View>
          </Card>

          {/* Theme Settings */}
          <Card variant="outlined" style={styles.sectionCard}>
            <ThemedText variant="bodyBold">{t('profile.theme')}</ThemedText>
            <View style={styles.buttonGroup}>
              {themeOptions.map((opt) => (
                <Button
                  key={opt.mode}
                  title={opt.label}
                  size="sm"
                  variant={themeMode === opt.mode ? 'primary' : 'secondary'}
                  onPress={() => setThemeMode(opt.mode)}
                />
              ))}
            </View>
          </Card>

          {/* Language Settings */}
          <Card variant="outlined" style={styles.sectionCard}>
            <ThemedText variant="bodyBold">{t('profile.language')}</ThemedText>
            <View style={styles.buttonGroup}>
              <Button
                title="Français (FR)"
                size="sm"
                variant={currentLocale === 'fr' ? 'primary' : 'secondary'}
                onPress={() => switchLanguage('fr')}
              />
              <Button
                title="English (EN)"
                size="sm"
                variant={currentLocale === 'en' ? 'primary' : 'secondary'}
                onPress={() => switchLanguage('en')}
              />
            </View>
          </Card>

          {/* App Version Info */}
          <View style={styles.footer}>
            <ThemedText variant="caption">
              {APP_CONFIG.name} v{APP_CONFIG.version} - {APP_CONFIG.country}
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  header: {
    gap: 4,
    paddingVertical: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  badge: {
    marginTop: 4,
  },
  sectionCard: {
    gap: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});
