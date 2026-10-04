import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, type Href } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatar, Badge, Card, Input } from '@/components/ui';
import { MOCK_CONVERSATIONS } from '@/features/messages/messagesMocks';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';

function timeAgo(dateStr: string): string {
  const diffMs = Math.max(0, Date.now() - new Date(dateStr).getTime());
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) return `${Math.max(1, minutes)} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.floor(hours / 24);
  return `${days} j`;
}

function truncate(text: string, max = 50): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export default function MessagesScreen() {
  const { spacing } = useAppTheme();
  const { t } = useAppLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const totalUnread = useMemo(
    () => MOCK_CONVERSATIONS.reduce((sum, conv) => sum + conv.unreadCount, 0),
    [],
  );

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = MOCK_CONVERSATIONS.filter((conv) =>
      !query ? true : conv.participant.name.toLowerCase().includes(query),
    );

    return [...list].sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
    );
  }, [searchQuery]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: spacing['4xl'], gap: spacing.md },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <ThemedText variant="h2">{t('messages.title')}</ThemedText>
              {totalUnread > 0 && (
                <Badge
                  label={t('messages.unreadCount', { count: totalUnread })}
                  variant="error"
                  size="sm"
                />
              )}
            </View>
          </View>

          <Input
            placeholder={t('messages.search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />

          {filteredConversations.length === 0 ? (
            <Card variant="outlined" style={styles.emptyContainer}>
              <ThemedText variant="bodyBold">{t('messages.noResults')}</ThemedText>
            </Card>
          ) : (
            filteredConversations.map((conv) => (
              <Pressable
                key={conv.id}
                accessibilityRole="button"
                accessibilityLabel={`Conversation avec ${conv.participant.name}`}
                onPress={() =>
                  router.push(`/(tabs)/messages/${conv.id}` as Href)
                }>
                <Card variant="elevated" style={styles.conversationCard}>
                  <View style={styles.conversationRow}>
                    <View style={styles.avatarWrapper}>
                      <Avatar
                        name={conv.participant.name}
                        source={conv.participant.avatarUrl}
                        size="md"
                      />
                      {conv.unreadCount > 0 && (
                        <View style={styles.unreadOverlay}>
                          <Badge
                            label={String(conv.unreadCount)}
                            variant="error"
                            size="sm"
                          />
                        </View>
                      )}
                    </View>

                    <View style={styles.conversationContent}>
                      <View style={styles.conversationTopRow}>
                        <ThemedText
                          variant="bodyBold"
                          numberOfLines={1}
                          style={styles.participantName}>
                          {conv.participant.name}
                        </ThemedText>
                        <ThemedText variant="caption" colorToken="textSecondary">
                          {timeAgo(conv.lastMessageAt)}
                        </ThemedText>
                      </View>

                      {conv.participant.headline ? (
                        <ThemedText
                          variant="caption"
                          colorToken="textSecondary"
                          numberOfLines={1}>
                          {conv.participant.headline}
                        </ThemedText>
                      ) : null}

                      <ThemedText
                        variant="caption"
                        colorToken="textSecondary"
                        numberOfLines={1}>
                        {truncate(conv.lastMessage)}
                      </ThemedText>
                    </View>
                  </View>
                </Card>
              </Pressable>
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
  },
  header: {
    gap: 4,
    paddingVertical: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  conversationCard: {
    gap: 0,
  },
  conversationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  unreadOverlay: {
    position: 'absolute',
    top: -6,
    right: -8,
  },
  conversationContent: {
    flex: 1,
    gap: 2,
  },
  conversationTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  participantName: {
    flexShrink: 1,
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
