import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';

export default function NetworkScreen() {
  const { spacing } = useAppTheme();
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
            <ThemedText variant="h2">{t('network.title')}</ThemedText>
            <ThemedText variant="caption">
              Connectez-vous avec des professionnels et des recruteurs
            </ThemedText>
          </View>

          {/* Network Summary Cards */}
          <View style={styles.statsRow}>
            <Card variant="outlined" style={styles.statCard}>
              <ThemedText variant="h2" colorToken="primary">
                0
              </ThemedText>
              <ThemedText variant="caption">{t('network.connections')}</ThemedText>
            </Card>

            <Card variant="outlined" style={styles.statCard}>
              <ThemedText variant="h2" colorToken="info">
                0
              </ThemedText>
              <ThemedText variant="caption">{t('network.invitations')}</ThemedText>
            </Card>
          </View>

          {/* Empty State */}
          <Card variant="outlined" style={styles.emptyContainer}>
            <ThemedText variant="bodyBold">Élargissez votre cercle</ThemedText>
            <ThemedText variant="caption" style={styles.emptyText}>
              Vous pourrez bientôt découvrir des suggestions de profils selon votre domaine d'activité et votre ville.
            </ThemedText>
          </Card>
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
  },
});
