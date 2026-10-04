import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatar, Button, IconButton } from '@/components/ui';
import { getConversationById } from '@/features/messages/messagesMocks';
import { Message } from '@/features/messages/types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useAuthStore } from '@/stores/useAuthStore';

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useAppLanguage();
  const { user } = useAuthStore();

  const conversation = getConversationById(typeof id === 'string' ? id : '');

  const [messages, setMessages] = useState<Message[]>(
    () => conversation?.messages ?? [],
  );
  const [draft, setDraft] = useState('');

  const currentUserId = user?.id ?? 'mock-001';

  const listData = useMemo(() => [...messages].reverse(), [messages]);

  const handleSend = () => {
    const content = draft.trim();
    if (!content || !conversation) return;

    const newMessage: Message = {
      id: `msg-local-${Date.now()}`,
      conversationId: conversation.id,
      senderId: currentUserId,
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setDraft('');
  };

  if (!conversation) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={[styles.notFound, { padding: spacing.lg, gap: spacing.md }]}>
            <ThemedText variant="h3">Conversation introuvable</ThemedText>
            <Button title="Retour" variant="outline" onPress={() => router.back()} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const renderMessage = ({ item }: { item: Message }) => {
    const isMine =
      item.senderId === user?.id || item.senderId === 'mock-001';

    return (
      <View
        style={[
          styles.messageRow,
          isMine ? styles.messageRowMine : styles.messageRowOther,
        ]}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: isMine ? colors.primary : colors.backgroundElement,
              borderRadius: radius.lg,
            },
            isMine ? styles.bubbleMine : styles.bubbleOther,
          ]}>
          <ThemedText
            variant="body"
            style={{ color: isMine ? '#FFFFFF' : colors.text }}>
            {item.content}
          </ThemedText>
        </View>
        <ThemedText
          variant="caption"
          colorToken="textSecondary"
          style={isMine ? styles.timeMine : styles.timeOther}>
          {formatMessageTime(item.createdAt)}
        </ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
          <View
            style={[
              styles.header,
              {
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
              },
            ]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Retour"
              onPress={() => router.back()}
              hitSlop={8}
              style={({ pressed }) => [
                styles.backButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}>
              <SymbolView
                name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
                tintColor={colors.text}
                size={22}
              />
            </Pressable>

            <Avatar
              name={conversation.participant.name}
              source={conversation.participant.avatarUrl}
              size="md"
            />

            <View style={styles.headerText}>
              <ThemedText variant="bodyBold" numberOfLines={1}>
                {conversation.participant.name}
              </ThemedText>
              {conversation.participant.headline ? (
                <ThemedText
                  variant="caption"
                  colorToken="textSecondary"
                  numberOfLines={1}>
                  {conversation.participant.headline}
                </ThemedText>
              ) : null}
            </View>
          </View>

          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            inverted
            style={styles.flex}
            contentContainerStyle={[
              styles.messagesContent,
              { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
            ]}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={[
              styles.composer,
              {
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                gap: spacing.sm,
              },
            ]}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder={t('messages.inputPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={2000}
              style={[
                styles.input,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                  color: colors.text,
                  maxHeight: 84,
                },
              ]}
            />
            <IconButton
              accessibilityLabel="Envoyer"
              variant="primary"
              size="md"
              disabled={draft.trim() === ''}
              onPress={handleSend}
              icon={
                <SymbolView
                  name={{ ios: 'paperplane.fill', android: 'send', web: 'send' }}
                  tintColor="#FFFFFF"
                  size={18}
                />
              }
            />
          </View>
        </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  messagesContent: {
    flexGrow: 1,
    gap: 10,
  },
  messageRow: {
    maxWidth: '82%',
    gap: 4,
    marginVertical: 4,
  },
  messageRowMine: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageRowOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMine: {
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    borderBottomLeftRadius: 4,
  },
  timeMine: {
    alignSelf: 'flex-end',
  },
  timeOther: {
    alignSelf: 'flex-start',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    minHeight: 44,
  },
});
