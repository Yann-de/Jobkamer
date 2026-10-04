import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, type Href } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Card } from '@/components/ui';
import { NotificationType } from '@/features/notifications/types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useNotificationStore } from '@/stores/useNotificationStore';

function timeAgo(dateStr: string): string {
  const diffMs = Math.max(0, Date.now() - new Date(dateStr).getTime());
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) return `${Math.max(1, minutes)} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.floor(hours / 24);
  return `${days} j`;
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'application_received':
    case 'application_updated':
      return {
        ios: 'briefcase.fill' as const,
        android: 'work' as const,
        web: 'work' as const,
      };
    case 'new_message':
      return {
        ios: 'bubble.left.fill' as const,
        android: 'chat_bubble' as const,
        web: 'chat_bubble' as const,
      };
    case 'job_match':
      return {
        ios: 'star.fill' as const,
        android: 'star' as const,
        web: 'star' as const,
      };
    case 'system':
    default:
      return {
        ios: 'bell.fill' as const,
        android: 'notifications' as const,
        web: 'notifications' as const,
      };
  }
}

export default function NotificationsScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useAppLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore();

  const handlePress = (id: string, targetRoute?: string) => {
    markAsRead(id);
    if (targetRoute) {
      router.push(targetRoute as Href);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
            },
          ]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retour"
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <SymbolView
              name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
              tintColor={colors.text}
              size={22}
            />
          </Pressable>

          <ThemedText variant="h3" style={styles.headerTitle}>
            {t('notifications.title')}
          </ThemedText>

          {unreadCount > 0 ? (
            <Button
              title={t('notifications.markAllRead')}
              variant="ghost"
              size="sm"
              onPress={markAllAsRead}
            />
          ) : (
            <View style={styles.headerSpacer} />
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            {
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.md,
              paddingBottom: spacing['4xl'],
              gap: spacing.md,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <Card variant="outlined" style={styles.emptyContainer}>
              <ThemedText variant="bodyBold">{t('notifications.empty')}</ThemedText>
            </Card>
          ) : (
            notifications.map((notif) => {
              const isUnread = !notif.readAt;
              return (
                <Pressable
                  key={notif.id}
                  accessibilityRole="button"
                  accessibilityLabel={notif.title}
                  onPress={() => handlePress(notif.id, notif.targetRoute)}>
                  <Card
                    variant="elevated"
                    style={{
                      ...styles.notificationCard,
                      backgroundColor: isUnread ? colors.infoLight : colors.surface,
                    }}>
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor: colors.surface,
                          borderRadius: radius.md,
                          borderColor: colors.border,
                        },
                      ]}>
                      <SymbolView
                        name={getNotificationIcon(notif.type)}
                        tintColor={colors.primary}
                        size={18}
                      />
                    </View>

                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTopRow}>
                        <ThemedText
                          variant="bodyBold"
                          numberOfLines={1}
                          style={styles.notificationTitle}>
                          {notif.title}
                        </ThemedText>
                        {isUnread ? (
                          <View
                            style={[
                              styles.unreadDot,
                              { backgroundColor: colors.primary },
                            ]}
                          />
                        ) : null}
                      </View>

                      <ThemedText
                        variant="caption"
                        colorToken="textSecondary"
                        numberOfLines={2}>
                        {notif.body}
                      </ThemedText>

                      <ThemedText variant="caption" colorToken="textSecondary">
                        {timeAgo(notif.createdAt)}
                      </ThemedText>
                    </View>
                  </Card>
                </Pressable>
              );
            })
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 72,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationTitle: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
