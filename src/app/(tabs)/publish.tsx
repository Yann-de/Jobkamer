import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, type Href } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatar, Button, Input } from '@/components/ui';
import { FeedPost } from '@/features/feed/types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFeedStore } from '@/stores/useFeedStore';

type PostType = FeedPost['type'];
type ContractType = 'CDI' | 'CDD' | 'Stage' | 'Freelance';

const CONTRACT_OPTIONS: ContractType[] = ['CDI', 'CDD', 'Stage', 'Freelance'];

export default function PublishScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useAppLanguage();
  const { user } = useAuthStore();
  const addPost = useFeedStore((state) => state.addPost);

  const accountType = user?.accountType ?? 'candidate';
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Utilisateur';
  const headline = user?.headline ?? '';

  const typeOptions = useMemo(() => {
    const base: { type: PostType; label: string }[] = [
      { type: 'classic', label: t('publish.typeUpdate') },
      { type: 'article', label: t('publish.typeArticle') },
    ];
    if (accountType === 'recruiter') {
      base.push({ type: 'job', label: t('publish.typeJob') });
    }
    return base;
  }, [accountType, t]);

  const [postType, setPostType] = useState<PostType>('classic');
  const [content, setContent] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCity, setJobCity] = useState(user?.city ?? '');
  const [jobContract, setJobContract] = useState<ContractType | null>(null);
  const [jobSalary, setJobSalary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contentError, setContentError] = useState<string | undefined>();
  const [jobTitleError, setJobTitleError] = useState<string | undefined>();
  const [jobCityError, setJobCityError] = useState<string | undefined>();
  const [jobContractError, setJobContractError] = useState<string | undefined>();

  const placeholder = useMemo(() => {
    switch (postType) {
      case 'article':
        return t('publish.placeholderArticle');
      case 'job':
        return t('publish.placeholderJob');
      default:
        return t('publish.placeholderUpdate');
    }
  }, [postType, t]);

  const canPublish = content.trim().length > 0;

  const clearErrors = () => {
    setContentError(undefined);
    setJobTitleError(undefined);
    setJobCityError(undefined);
    setJobContractError(undefined);
  };

  const handleSubmit = async () => {
    clearErrors();

    let hasError = false;
    if (!content.trim()) {
      setContentError(t('publish.errorContent'));
      hasError = true;
    }

    if (postType === 'job' && accountType === 'recruiter') {
      if (!jobTitle.trim()) {
        setJobTitleError(t('publish.errorJobTitle'));
        hasError = true;
      }
      if (!jobCity.trim()) {
        setJobCityError(t('publish.errorJobCity'));
        hasError = true;
      }
      if (!jobContract) {
        setJobContractError(t('publish.errorJobContract'));
        hasError = true;
      }
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newPost: FeedPost = {
        id: Date.now().toString(),
        author: {
          id: user?.id ?? 'unknown',
          name: fullName,
          headline,
          location: user?.city,
          isCompany: accountType === 'recruiter',
        },
        type: postType,
        timestamp: "À l'instant",
        content: content.trim(),
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0,
        ...(postType === 'job' && jobContract
          ? {
              jobDetails: {
                title: jobTitle.trim(),
                company: fullName,
                contractType: jobContract,
                location: jobCity.trim(),
                salary: jobSalary.trim() || undefined,
              },
            }
          : {}),
      };

      addPost(newPost);
      router.replace('/(tabs)/' as Href);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
              accessibilityLabel={t('publish.cancel')}
              onPress={() => router.back()}
              hitSlop={8}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <ThemedText variant="body" colorToken="textSecondary">
                {t('publish.cancel')}
              </ThemedText>
            </Pressable>

            <ThemedText variant="h3" style={styles.headerTitle}>
              {t('publish.title')}
            </ThemedText>

            <Button
              title={t('publish.publish')}
              variant="primary"
              size="sm"
              disabled={!canPublish}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            />
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.content,
              {
                padding: spacing.lg,
                gap: spacing.lg,
                paddingBottom: spacing['4xl'],
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={[styles.authorRow, { gap: spacing.md }]}>
              <Avatar name={fullName} source={user?.avatarUrl} size="md" status="online" />
              <View style={styles.authorText}>
                <ThemedText variant="bodyBold" numberOfLines={1}>
                  {fullName}
                </ThemedText>
                {headline ? (
                  <ThemedText variant="caption" colorToken="textSecondary" numberOfLines={1}>
                    {headline}
                  </ThemedText>
                ) : null}
              </View>
            </View>

            <View style={styles.chipsRow}>
              {typeOptions.map((option) => {
                const isSelected = postType === option.type;
                return (
                  <Button
                    key={option.type}
                    title={option.label}
                    size="sm"
                    variant={isSelected ? 'primary' : 'secondary'}
                    onPress={() => {
                      setPostType(option.type);
                      clearErrors();
                    }}
                  />
                );
              })}
            </View>

            <View style={{ gap: spacing.xs }}>
              <TextInput
                value={content}
                onChangeText={(value) => {
                  setContent(value.slice(0, 1000));
                  if (contentError) setContentError(undefined);
                }}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                multiline
                maxLength={1000}
                textAlignVertical="top"
                style={[
                  styles.contentInput,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: contentError ? colors.error : colors.border,
                    borderRadius: radius.md,
                    color: colors.text,
                    minHeight: 120,
                  },
                ]}
              />
              {contentError ? (
                <ThemedText variant="caption" colorToken="error">
                  {contentError}
                </ThemedText>
              ) : null}
              <ThemedText
                variant="caption"
                colorToken="textSecondary"
                style={styles.charCount}>
                {t('publish.charCount', { count: content.length })}
              </ThemedText>
            </View>

            {postType === 'job' && accountType === 'recruiter' ? (
              <View style={{ gap: spacing.md }}>
                <Input
                  label={t('publish.jobTitle')}
                  value={jobTitle}
                  onChangeText={(value) => {
                    setJobTitle(value);
                    if (jobTitleError) setJobTitleError(undefined);
                  }}
                  error={jobTitleError}
                />

                <Input
                  label={t('publish.jobCity')}
                  value={jobCity}
                  onChangeText={(value) => {
                    setJobCity(value);
                    if (jobCityError) setJobCityError(undefined);
                  }}
                  error={jobCityError}
                />

                <View style={{ gap: spacing.xs }}>
                  <ThemedText variant="bodySmallBold">{t('publish.jobContract')}</ThemedText>
                  <View style={styles.chipsRow}>
                    {CONTRACT_OPTIONS.map((contract) => {
                      const isSelected = jobContract === contract;
                      return (
                        <Button
                          key={contract}
                          title={contract}
                          size="sm"
                          variant={isSelected ? 'primary' : 'secondary'}
                          onPress={() => {
                            setJobContract(contract);
                            if (jobContractError) setJobContractError(undefined);
                          }}
                        />
                      );
                    })}
                  </View>
                  {jobContractError ? (
                    <ThemedText variant="caption" colorToken="error">
                      {jobContractError}
                    </ThemedText>
                  ) : null}
                </View>

                <Input
                  label={t('publish.jobSalary')}
                  placeholder="Ex : 300 000 - 450 000 FCFA"
                  value={jobSalary}
                  onChangeText={setJobSalary}
                />
              </View>
            ) : null}
          </ScrollView>
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
  content: {
    flexGrow: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    flex: 1,
    gap: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  contentInput: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  charCount: {
    textAlign: 'right',
  },
});
