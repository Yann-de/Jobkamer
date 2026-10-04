import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge, Button, Card, Input } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';

const CONTRACT_FILTERS = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'] as const;

export default function JobsScreen() {
  const { spacing } = useAppTheme();
  const { t } = useAppLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['4xl'] }]}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText variant="h2">{t('jobs.title')}</ThemedText>
            <ThemedText variant="caption">
              Recherchez et postulez aux opportunités d'emploi
            </ThemedText>
          </View>

          {/* Search bar */}
          <Input
            placeholder={t('jobs.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />

          {/* Filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {CONTRACT_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <Button
                  key={filter}
                  title={filter}
                  size="sm"
                  variant={isSelected ? 'primary' : 'secondary'}
                  onPress={() => setSelectedFilter(filter)}
                />
              );
            })}
          </ScrollView>

          {/* Jobs List Placeholder */}
          <Card variant="outlined" style={styles.emptyContainer}>
            <ThemedText variant="bodyBold">
              Aucune offre active pour le moment
            </ThemedText>
            <ThemedText variant="caption" style={styles.emptySubtitle}>
              Les offres d'emploi validées des recruteurs camerounais seront répertoriées ici.
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
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
