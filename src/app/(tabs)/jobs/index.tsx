import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, type Href } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge, Button, Card, Input } from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useJobsStore } from '@/stores/useJobsStore';
import { jobsService } from '@/services/jobs/jobsService';
import { Job } from '@/types';

const CONTRACT_FILTERS = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'] as const;

function translateWorkplace(type: Job['workplaceType']): string {
  switch (type) {
    case 'on-site':
      return 'Présentiel';
    case 'hybrid':
      return 'Hybride';
    case 'remote':
      return 'Télétravail';
    default:
      return type;
  }
}

function daysAgo(dateStr: string): string {
  const days = Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)),
  );
  return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
}

export default function JobsScreen() {
  const { spacing, colors } = useAppTheme();
  const { t } = useAppLanguage();
  const { jobs, isLoading, error, setJobs, setLoading } = useJobsStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const openJobs = await jobsService.getOpenJobs();
        setJobs(openJobs);
      } catch (err) {
        console.error('Error loading jobs:', err);
        // Keep the mocks as fallback
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [setJobs, setLoading]);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return jobs.filter((job: Job) => {
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query);

      const matchesFilter =
        selectedFilter === 'Tous' || job.contractType === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter, jobs]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['4xl'] }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText variant="h2">{t('jobs.title')}</ThemedText>
            <ThemedText variant="caption" colorToken="textSecondary">
              {t('jobs.offersCount', { count: filteredJobs.length })}
            </ThemedText>
          </View>

          {error && (
            <Badge label="Mode hors ligne" variant="warning" size="sm" />
          )}

          <Input
            placeholder={t('jobs.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />

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

          {isLoading ? (
            <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : filteredJobs.length === 0 ? (
            <Card variant="outlined" style={styles.emptyContainer}>
              <ThemedText variant="bodyBold">{t('jobs.noResults')}</ThemedText>
            </Card>
          ) : (
            filteredJobs.map((job: Job) => (
              <Card key={job.id} variant="elevated" style={styles.jobCard}>
                <ThemedText variant="bodyBold">{job.title}</ThemedText>
                <ThemedText variant="caption" colorToken="textSecondary">
                  {job.companyName} • {job.city}
                </ThemedText>

                <View style={styles.badgesRow}>
                  <Badge label={job.contractType} variant="secondary" size="sm" />
                  <Badge
                    label={translateWorkplace(job.workplaceType)}
                    variant="neutral"
                    size="sm"
                  />
                </View>

                {job.salaryMin ? (
                  <ThemedText variant="bodySmallBold" colorToken="primary">
                    {`${job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()} FCFA`}
                  </ThemedText>
                ) : (
                  <ThemedText variant="caption" colorToken="textSecondary">
                    {t('jobs.salary')}
                  </ThemedText>
                )}

                <ThemedText variant="caption" colorToken="textSecondary">
                  {daysAgo(job.createdAt)}
                </ThemedText>

                <Button
                  title="Voir l'offre"
                  variant="outline"
                  size="sm"
                  onPress={() => router.push(`/(tabs)/jobs/${job.id}` as Href)}
                  accessibilityLabel={`Voir l'offre - ${job.title}`}
                />
              </Card>
            ))
          )}
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
  jobCard: {
    gap: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 16,
  },
});
