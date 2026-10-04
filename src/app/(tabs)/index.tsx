import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
} from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { APP_CONFIG } from '@/constants/config';

interface FeedAuthor {
  id: string;
  name: string;
  headline: string;
  location?: string;
  isCompany?: boolean;
}

interface JobOfferDetails {
  title: string;
  company: string;
  contractType: string;
  location: string;
  salary?: string;
}

interface FeedPost {
  id: string;
  author: FeedAuthor;
  type: 'classic' | 'job';
  timestamp: string;
  content: string;
  jobDetails?: JobOfferDetails;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const MOCK_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    author: {
      id: 'user-1',
      name: 'Amina N.',
      headline: 'Développeuse Web & Mobile',
      location: 'Douala',
      isCompany: false,
    },
    type: 'classic',
    timestamp: 'Il y a 2 h',
    content:
      'Je viens de terminer avec succès une nouvelle certification en développement web & cloud. Je suis actuellement à l’écoute de nouvelles opportunités au Cameroun pour des projets innovants !',
    likesCount: 24,
    commentsCount: 6,
    sharesCount: 3,
  },
  {
    id: 'post-2',
    author: {
      id: 'comp-1',
      name: 'Tech Cameroon',
      headline: 'Entreprise • Solutions Logicielles',
      location: 'Yaoundé',
      isCompany: true,
    },
    type: 'job',
    timestamp: 'Il y a 4 h',
    content:
      'Nous recherchons un développeur motivé pour rejoindre notre équipe d’ingénierie et participer à des projets numériques innovants au Cameroun.',
    jobDetails: {
      title: 'Développeur Full-Stack Junior',
      company: 'Tech Cameroon',
      contractType: 'CDI',
      location: 'Yaoundé',
      salary: 'À négocier',
    },
    likesCount: 42,
    commentsCount: 11,
    sharesCount: 8,
  },
  {
    id: 'post-3',
    author: {
      id: 'comp-2',
      name: 'Digital Solutions',
      headline: 'Entreprise • Technologies & Data',
      location: 'Douala',
      isCompany: true,
    },
    type: 'job',
    timestamp: 'Il y a 8 h',
    content:
      'Nous recrutons un Data Analyst passionné par les chiffres pour renforcer notre pôle analytique et accompagner la prise de décision stratégique de nos partenaires.',
    jobDetails: {
      title: 'Data Analyst',
      company: 'Digital Solutions',
      contractType: 'CDD',
      location: 'Douala',
      salary: '350 000 - 500 000 FCFA',
    },
    likesCount: 31,
    commentsCount: 7,
    sharesCount: 5,
  },
  {
    id: 'post-4',
    author: {
      id: 'user-2',
      name: 'Samuel E.',
      headline: 'Recruteur IT • Talent Acquisition Specialist',
      location: 'Yaoundé',
      isCompany: false,
    },
    type: 'classic',
    timestamp: 'Il y a 1 j',
    content:
      'Conseil aux jeunes diplômés camerounais : valorisez vos projets pratiques, vos réalisations concrètes et votre présence sur JobKamer. Le marché tech local recherche avant tout des profils proactifs !',
    likesCount: 58,
    commentsCount: 19,
    sharesCount: 14,
  },
];

export default function FeedScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useAppLanguage();

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleToggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Compact Header */}
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
          <View style={styles.headerTitleContainer}>
            <ThemedText variant="h2" colorToken="primary" style={styles.brandTitle}>
              {APP_CONFIG.name}
            </ThemedText>
            <ThemedText variant="caption" colorToken="textSecondary" numberOfLines={1}>
              {t('home.subtitle')}
            </ThemedText>
          </View>
          <View style={styles.headerActions}>
            <IconButton
              icon={
                <SymbolView
                  name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
                  tintColor={colors.text}
                  size={20}
                />
              }
              accessibilityLabel={t('common.search')}
              variant="ghost"
              size="sm"
              onPress={() => router.push('/(tabs)/jobs')}
            />
            <IconButton
              icon={
                <SymbolView
                  name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
                  tintColor={colors.text}
                  size={20}
                />
              }
              accessibilityLabel={t('feed.notifications')}
              variant="ghost"
              size="sm"
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.md,
              paddingBottom: spacing['4xl'],
              gap: spacing.lg,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          {/* Post Composer */}
          <Card variant="elevated" style={styles.composerCard}>
            <View style={styles.composerTopRow}>
              <Avatar name="Yannick JobKamer" size="md" status="online" />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('feed.composerPlaceholder')}
                style={({ pressed }) => [
                  styles.composerInputButton,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                    borderRadius: radius.full,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}>
                <ThemedText variant="bodySmall" colorToken="textSecondary" numberOfLines={1}>
                  {t('feed.composerPlaceholder')}
                </ThemedText>
              </Pressable>
            </View>

            <Divider spacing={spacing.sm} />

            <View style={styles.composerActionsRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('feed.photo')}
                style={({ pressed }) => [
                  styles.composerActionButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}>
                <SymbolView
                  name={{ ios: 'photo', android: 'image', web: 'image' }}
                  tintColor={colors.primary}
                  size={18}
                />
                <ThemedText variant="bodySmallBold" colorToken="primary">
                  {t('feed.photo')}
                </ThemedText>
              </Pressable>

              <View style={[styles.actionDivider, { backgroundColor: colors.border }]} />

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('feed.jobOffer')}
                style={({ pressed }) => [
                  styles.composerActionButton,
                  { opacity: pressed ? 0.7 : 1 },
                ]}>
                <SymbolView
                  name={{ ios: 'briefcase.fill', android: 'work', web: 'work' }}
                  tintColor={colors.secondary}
                  size={18}
                />
                <ThemedText variant="bodySmallBold" colorToken="secondary">
                  {t('feed.jobOffer')}
                </ThemedText>
              </Pressable>
            </View>
          </Card>

          {/* Feed Title & Filter Badge */}
          <View style={styles.feedHeaderRow}>
            <ThemedText variant="h3">
              {t('feed.title')}
            </ThemedText>
            <Badge label={t('feed.recent')} variant="neutral" size="sm" />
          </View>

          {/* Posts List */}
          {MOCK_POSTS.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const currentLikes = isLiked ? post.likesCount + 1 : post.likesCount;

            return (
              <Card key={post.id} variant="elevated" style={styles.postCard}>
                {/* Author & Header */}
                <View style={styles.postHeader}>
                  <Avatar name={post.author.name} size="md" />
                  <View style={styles.authorInfo}>
                    <View style={styles.authorNameRow}>
                      <ThemedText variant="bodyBold" numberOfLines={1} style={styles.authorNameText}>
                        {post.author.name}
                      </ThemedText>
                      {post.type === 'job' && (
                        <Badge label={t('feed.jobBadge')} variant="primary" size="sm" />
                      )}
                    </View>
                    <ThemedText variant="caption" colorToken="textSecondary" numberOfLines={1}>
                      {post.author.headline}
                    </ThemedText>
                    <View style={styles.postMetaRow}>
                      {post.author.location && (
                        <View style={styles.locationContainer}>
                          <SymbolView
                            name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                            tintColor={colors.textSecondary}
                            size={12}
                          />
                          <ThemedText variant="caption" colorToken="textSecondary">
                            {post.author.location}
                          </ThemedText>
                        </View>
                      )}
                      {post.author.location && (
                        <ThemedText variant="caption" colorToken="textSecondary">
                          •
                        </ThemedText>
                      )}
                      <ThemedText variant="caption" colorToken="textSecondary">
                        {post.timestamp}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Content */}
                <ThemedText variant="body" style={styles.postText}>
                  {post.content}
                </ThemedText>

                {/* Embedded Job Card */}
                {post.type === 'job' && post.jobDetails && (
                  <Card
                    variant="outlined"
                    padding="md"
                    style={{
                      ...styles.jobCard,
                      backgroundColor: colors.backgroundElement,
                      borderColor: colors.border,
                    }}>
                    <View style={styles.jobCardTopRow}>
                      <View
                        style={[
                          styles.jobIconBox,
                          {
                            backgroundColor: colors.surface,
                            borderRadius: radius.md,
                            borderColor: colors.border,
                            borderWidth: 1,
                          },
                        ]}>
                        <SymbolView
                          name={{ ios: 'briefcase.fill', android: 'work', web: 'work' }}
                          tintColor={colors.primary}
                          size={22}
                        />
                      </View>
                      <View style={styles.jobTitleBox}>
                        <ThemedText variant="bodyBold" numberOfLines={1}>
                          {post.jobDetails.title}
                        </ThemedText>
                        <ThemedText variant="caption" colorToken="textSecondary" numberOfLines={1}>
                          {post.jobDetails.company}
                        </ThemedText>
                      </View>
                    </View>

                    <View style={styles.jobDetailsRow}>
                      <Badge label={post.jobDetails.contractType} variant="secondary" size="sm" />
                      <View style={styles.locationContainer}>
                        <SymbolView
                          name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                          tintColor={colors.textSecondary}
                          size={12}
                        />
                        <ThemedText variant="caption" colorToken="textSecondary">
                          {post.jobDetails.location}
                        </ThemedText>
                      </View>
                      {post.jobDetails.salary && (
                        <ThemedText variant="captionBold" colorToken="primary">
                          {post.jobDetails.salary}
                        </ThemedText>
                      )}
                    </View>

                    <Button
                      title={t('feed.viewJob')}
                      variant="primary"
                      size="sm"
                      onPress={() => router.push('/(tabs)/jobs')}
                      accessibilityLabel={`${t('feed.viewJob')} - ${post.jobDetails.title}`}
                    />
                  </Card>
                )}

                <Divider spacing={spacing.xs} />

                {/* Social Actions Row */}
                <View style={styles.socialActionsRow}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${t('feed.like')}, ${currentLikes} j'aime`}
                    accessibilityState={{ selected: isLiked }}
                    onPress={() => handleToggleLike(post.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={({ pressed }) => [
                      styles.socialButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}>
                    <SymbolView
                      name={
                        isLiked
                          ? { ios: 'heart.fill', android: 'favorite', web: 'favorite' }
                          : { ios: 'heart', android: 'favorite_border', web: 'favorite_border' }
                      }
                      tintColor={isLiked ? colors.error : colors.textSecondary}
                      size={18}
                    />
                    <ThemedText
                      variant="bodySmall"
                      colorToken={isLiked ? 'error' : 'textSecondary'}
                      weight={isLiked ? '700' : '500'}>
                      {currentLikes}
                    </ThemedText>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${t('feed.comment')}, ${post.commentsCount} commentaires`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={({ pressed }) => [
                      styles.socialButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}>
                    <SymbolView
                      name={{ ios: 'bubble.left', android: 'chat_bubble_outline', web: 'chat_bubble_outline' }}
                      tintColor={colors.textSecondary}
                      size={18}
                    />
                    <ThemedText variant="bodySmall" colorToken="textSecondary" weight="500">
                      {post.commentsCount}
                    </ThemedText>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${t('feed.share')}, ${post.sharesCount} partages`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={({ pressed }) => [
                      styles.socialButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}>
                    <SymbolView
                      name={{ ios: 'arrowshape.turn.up.right', android: 'share', web: 'share' }}
                      tintColor={colors.textSecondary}
                      size={18}
                    />
                    <ThemedText variant="bodySmall" colorToken="textSecondary" weight="500">
                      {post.sharesCount}
                    </ThemedText>
                  </Pressable>
                </View>
              </Card>
            );
          })}
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
  },
  headerTitleContainer: {
    flex: 1,
    gap: 2,
  },
  brandTitle: {
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  composerCard: {
    gap: 12,
  },
  composerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  composerInputButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  composerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 2,
  },
  composerActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionDivider: {
    width: 1,
    height: 18,
  },
  feedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  postCard: {
    gap: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  authorNameText: {
    flexShrink: 1,
  },
  postMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  postText: {
    lineHeight: 22,
  },
  jobCard: {
    gap: 12,
    marginTop: 2,
  },
  jobCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jobIconBox: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTitleBox: {
    flex: 1,
    gap: 2,
  },
  jobDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  socialActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 2,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
