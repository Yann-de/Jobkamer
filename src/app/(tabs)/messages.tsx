import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card, Input } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';

export default function MessagesScreen() {
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
            <ThemedText variant="h2">{t('messages.title')}</ThemedText>
            <ThemedText variant="caption">
              Vos échanges professionnels avec recruteurs et pairs
            </ThemedText>
          </View>

          {/* Search */}
          <Input placeholder={t('messages.search')} />

          {/* Empty State */}
          <Card variant="outlined" style={styles.emptyContainer}>
            <ThemedText variant="bodyBold">
              {t('messages.empty')}
            </ThemedText>
            <ThemedText variant="caption" style={styles.emptySubtitle}>
              Engagez la conversation après avoir postulé ou établi une nouvelle connexion.
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 16,
  },
  emptySubtitle: {
    textAlign: 'center',
  },
});
