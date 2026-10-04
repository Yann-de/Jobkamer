import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useTranslation } from 'react-i18next';

import { Container, Button, Input, Avatar } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from '@/types';

type AvailabilityOption = 'availableNow' | 'availableSoon' | 'openToWork';
type CompanySizeOption = '1-10' | '11-50' | '51-200' | '200+';

export default function OnboardingScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { t } = useTranslation();
  const { user, updateUser, setSession, token } = useAuthStore();

  const accountType = user?.accountType ?? 'candidate';
  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : '';

  // Form states
  const [headline, setHeadline] = useState(user?.headline ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  // Candidate specific
  const [availability, setAvailability] = useState<AvailabilityOption>(
    (user?.availability as AvailabilityOption) ?? 'availableNow'
  );

  // Recruiter specific
  const [sector, setSector] = useState(user?.sector ?? '');
  const [companySize, setCompanySize] = useState<CompanySizeOption>(
    (user?.companySize as CompanySizeOption) ?? '11-50'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availabilityOptions: { key: AvailabilityOption; label: string }[] = [
    { key: 'availableNow', label: t('onboarding.availableNow') },
    { key: 'availableSoon', label: t('onboarding.availableSoon') },
    { key: 'openToWork', label: t('onboarding.openToWork') },
  ];

  const companySizeOptions: CompanySizeOption[] = ['1-10', '11-50', '51-200', '200+'];

  const handleAvatarPress = () => {
    Alert.alert(t('onboarding.avatarAlertTitle'), t('onboarding.avatarAlertMessage'));
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);

      const updatedUser: User = {
        id: user?.id ?? 'mock-001',
        firstName: user?.firstName ?? 'Utilisateur',
        lastName: user?.lastName ?? 'JobKamer',
        email: user?.email ?? 'user@jobkamer.cm',
        accountType,
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        ...(accountType === 'candidate'
          ? { availability }
          : { sector: sector.trim() || undefined, companySize }),
      };

      if (updateUser) {
        updateUser(updatedUser);
      }
      if (setSession && token) {
        setSession(updatedUser, token);
      }

      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const headlinePlaceholder =
    accountType === 'candidate'
      ? t('onboarding.headlineCandidatePlaceholder')
      : t('onboarding.headlineRecruiterPlaceholder');

  return (
    <Container useSafeArea scrollable padding="lg" style={styles.container}>
      <View style={[styles.content, { gap: spacing.lg }]}>
        {/* Top bar with skip button */}
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('onboarding.skip')}
            onPress={handleSkip}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.skipButton}>
            <ThemedText variant="bodySmall" weight="600" colorToken="primary">
              {t('onboarding.skip')}
            </ThemedText>
          </Pressable>
        </View>

        {/* Header Section */}
        <View style={[styles.headerSection, { gap: spacing.xs }]}>
          <ThemedText variant="h1" colorToken="text">
            {t('onboarding.title')}
          </ThemedText>
          <ThemedText variant="bodySmall" colorToken="textSecondary">
            {t('onboarding.subtitle')}
          </ThemedText>
        </View>

        {/* Avatar Picker */}
        <View style={styles.avatarSection}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('onboarding.avatar')}
            onPress={handleAvatarPress}
            style={styles.avatarWrapper}>
            <Avatar name={displayName} size="xl" />
            <View
              style={[
                styles.cameraBadge,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.surface,
                  borderRadius: radius.full,
                },
              ]}>
              <SymbolView
                name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
                tintColor={colors.primaryForeground}
                size={16}
              />
            </View>
          </Pressable>
          <ThemedText variant="caption" colorToken="textSecondary" style={styles.avatarLabel}>
            {t('onboarding.avatar')}
          </ThemedText>
        </View>

        {/* Form Fields */}
        <View style={[styles.form, { gap: spacing.lg }]}>
          {/* Professional Headline */}
          <Input
            label={t('onboarding.headline')}
            placeholder={headlinePlaceholder}
            value={headline}
            onChangeText={setHeadline}
            autoCapitalize="sentences"
          />

          {/* Bio Field with character counter */}
          <View style={{ gap: spacing.xs }}>
            <Input
              label={t('onboarding.bio')}
              placeholder={t('onboarding.bioPlaceholder')}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              maxLength={300}
              style={[styles.bioInput, { height: 90 }]}
            />
            <ThemedText
              variant="caption"
              colorToken="textSecondary"
              align="right"
              style={styles.counterText}>
              {`${bio.length}/300`}
            </ThemedText>
          </View>

          {/* Candidate-specific: Availability Selector */}
          {accountType === 'candidate' && (
            <View style={{ gap: spacing.sm }}>
              <ThemedText variant="bodySmall" weight="600" colorToken="text">
                {t('onboarding.availability')}
              </ThemedText>
              <View style={[styles.chipsContainer, { gap: spacing.sm }]}>
                {availabilityOptions.map((opt) => {
                  const isSelected = availability === opt.key;
                  return (
                    <Pressable
                      key={opt.key}
                      accessibilityRole="button"
                      accessibilityLabel={opt.label}
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => setAvailability(opt.key)}
                      style={[
                        styles.chip,
                        {
                          borderRadius: radius.full,
                          borderColor: isSelected ? colors.primary : colors.border,
                          borderWidth: isSelected ? 1.5 : 1,
                          backgroundColor: isSelected
                            ? colors.infoLight
                            : colors.backgroundElement,
                        },
                      ]}>
                      <ThemedText
                        variant="bodySmall"
                        weight={isSelected ? '600' : '400'}
                        colorToken={isSelected ? 'primary' : 'textSecondary'}>
                        {opt.label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* Recruiter-specific: Sector & Company Size */}
          {accountType === 'recruiter' && (
            <View style={{ gap: spacing.lg }}>
              <Input
                label={t('onboarding.sector')}
                placeholder={t('onboarding.sectorPlaceholder')}
                value={sector}
                onChangeText={setSector}
                autoCapitalize="words"
              />

              <View style={{ gap: spacing.sm }}>
                <ThemedText variant="bodySmall" weight="600" colorToken="text">
                  {t('onboarding.companySize')}
                </ThemedText>
                <View style={[styles.chipsRow, { gap: spacing.sm }]}>
                  {companySizeOptions.map((size) => {
                    const isSelected = companySize === size;
                    return (
                      <Pressable
                        key={size}
                        accessibilityRole="button"
                        accessibilityLabel={`${t('onboarding.companySize')}: ${size}`}
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => setCompanySize(size)}
                        style={[
                          styles.sizeChip,
                          {
                            borderRadius: radius.full,
                            borderColor: isSelected ? colors.primary : colors.border,
                            borderWidth: isSelected ? 1.5 : 1,
                            backgroundColor: isSelected
                              ? colors.infoLight
                              : colors.backgroundElement,
                          },
                        ]}>
                        <ThemedText
                          variant="bodySmall"
                          weight={isSelected ? '600' : '400'}
                          colorToken={isSelected ? 'primary' : 'textSecondary'}>
                          {size}
                        </ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
          )}

          {/* Save Button */}
          <View style={{ marginTop: spacing.md }}>
            <Button
              title={t('onboarding.save')}
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              onPress={handleSave}
              accessibilityLabel={t('onboarding.save')}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  headerSection: {
    marginTop: 4,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    gap: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarLabel: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  bioInput: {
    textAlignVertical: 'top',
  },
  counterText: {
    marginTop: 2,
    marginRight: 4,
  },
  chipsContainer: {
    flexDirection: 'column',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
