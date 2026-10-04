import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Card, Badge } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { APP_CONFIG } from '@/constants/config';

export default function FeedScreen() {
  const { colors, spacing } = useAppTheme();
  const { t } = useAppLanguage();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['4xl'] }]}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText variant="h2" colorToken="primary">
                {APP_CONFIG.name}
              </ThemedText>
              <ThemedText variant="caption">
                {t('home.subtitle')}
              </ThemedText>
            </View>
            <Badge label="Cameroun" variant="primary" />
          </View>

          {/* Hero Banner */}
          <Card variant="elevated" style={styles.heroCard}>
            <ThemedText variant="h3">
              {t('home.welcome')}
            </ThemedText>
            <ThemedText variant="caption" style={styles.heroText}>
              Trouvez les meilleures opportunités professionnelles à Douala, Yaoundé et dans tout le Cameroun.
            </ThemedText>
            <View style={styles.heroActions}>
              <Button
                title={t('navigation.jobs')}
                size="md"
                variant="primary"
                onPress={() => router.push('/(tabs)/jobs')}
              />
              <Button
                title={t('navigation.network')}
                size="md"
                variant="outline"
                onPress={() => router.push('/(tabs)/network')}
              />
            </View>
          </Card>

          {/* Featured Sections Placeholder */}
          <View style={styles.sectionHeader}>
            <ThemedText variant="h3">
              {t('home.featuredJobs')}
            </ThemedText>
            <ThemedText variant="link" onPress={() => router.push('/(tabs)/jobs')}>
              {t('common.seeAll')}
            </ThemedText>
          </View>

          <Card variant="outlined" style={styles.emptyCard}>
            <ThemedText variant="bodyBold" style={styles.emptyTitle}>
              Plateforme prête à l'emploi
            </ThemedText>
            <ThemedText variant="caption" style={styles.emptyText}>
              Les offres d'emploi et les publications de votre réseau s'afficheront ici en temps réel dès la connexion à vos services.
            </ThemedText>
          </Card>

          {/* Quick Info */}
          <View style={styles.quickInfoContainer}>
            <ThemedText variant="label">Villes couvertes</ThemedText>
            <View style={styles.citiesRow}>
              {APP_CONFIG.cities.slice(0, 5).map((city) => (
                <Badge key={city} label={city} variant="secondary" />
              ))}
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  heroCard: {
    gap: 12,
  },
  heroText: {
    marginTop: 4,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    gap: 8,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  quickInfoContainer: {
    gap: 8,
    marginTop: 8,
  },
  citiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
