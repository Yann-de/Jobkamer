import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useTranslation } from 'react-i18next';

import { Container, Button, Card } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRegistrationStore } from '@/stores/useRegistrationStore';
import { authService } from '@/services/auth/authService';
import { AccountType, RegisterInput } from '@/features/auth/types';

export default function AccountTypeScreen() {
  const { spacing, colors, radius } = useAppTheme();
  const { t } = useTranslation();
  const { setSession } = useAuthStore();
  const { data: savedData, resetRegistration } = useRegistrationStore();

  const [accountType, setAccountType] = useState<AccountType>('candidate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const fullInput: RegisterInput = {
        firstName: savedData.firstName || 'Utilisateur',
        lastName: savedData.lastName || 'JobKamer',
        email: savedData.email || 'user@jobkamer.cm',
        password: savedData.password || 'password123',
        phone: savedData.phone,
        city: savedData.city,
        accountType,
      };

      const session = await authService.register(fullInput);
      setSession(session.user, session.token);
      resetRegistration();
      router.replace('/(tabs)');
    } catch {
      setErrorMessage('Une erreur est survenue lors de la création du compte.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCandidateSelected = accountType === 'candidate';
  const isRecruiterSelected = accountType === 'recruiter';

  return (
    <Container useSafeArea scrollable centerContent padding="lg" style={styles.container}>
      <View style={[styles.content, { gap: spacing.xl }]}>
        {/* Header Section */}
        <View style={[styles.headerSection, { gap: spacing.xs }]}>
          <ThemedText variant="h1" colorToken="primary">
            JobKamer
          </ThemedText>
          <ThemedText variant="h2">
            {t('auth.accountType.title')}
          </ThemedText>
          <ThemedText variant="bodySmall" colorToken="textSecondary">
            {t('auth.accountType.subtitle')}
          </ThemedText>
        </View>

        {errorMessage && (
          <ThemedText variant="captionBold" colorToken="error">
            {errorMessage}
          </ThemedText>
        )}

        {/* Selection Cards */}
        <View style={[styles.cardsContainer, { gap: spacing.md }]}>
          {/* Candidate Card */}
          <Card
            variant={isCandidateSelected ? 'elevated' : 'outlined'}
            padding="lg"
            interactive
            onPress={() => setAccountType('candidate')}
            style={{
              borderColor: isCandidateSelected ? colors.primary : colors.border,
              borderWidth: isCandidateSelected ? 2 : 1,
              backgroundColor: isCandidateSelected ? colors.surface : colors.backgroundElement,
            }}>
            <View style={[styles.cardContent, { gap: spacing.md }]}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: isCandidateSelected ? colors.primaryLight : colors.surface,
                    borderRadius: radius.md,
                  },
                ]}>
                <SymbolView
                  name={{ ios: 'person.fill', android: 'person', web: 'person' }}
                  tintColor={isCandidateSelected ? colors.primary : colors.textSecondary}
                  size={26}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText
                  variant="bodyBold"
                  colorToken={isCandidateSelected ? 'primary' : 'text'}>
                  {t('auth.accountType.candidateTitle')}
                </ThemedText>
                <ThemedText variant="bodySmall" colorToken="textSecondary">
                  {t('auth.accountType.candidateDescription')}
                </ThemedText>
              </View>
            </View>
          </Card>

          {/* Recruiter Card */}
          <Card
            variant={isRecruiterSelected ? 'elevated' : 'outlined'}
            padding="lg"
            interactive
            onPress={() => setAccountType('recruiter')}
            style={{
              borderColor: isRecruiterSelected ? colors.primary : colors.border,
              borderWidth: isRecruiterSelected ? 2 : 1,
              backgroundColor: isRecruiterSelected ? colors.surface : colors.backgroundElement,
            }}>
            <View style={[styles.cardContent, { gap: spacing.md }]}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: isRecruiterSelected ? colors.primaryLight : colors.surface,
                    borderRadius: radius.md,
                  },
                ]}>
                <SymbolView
                  name={{ ios: 'building.2.fill', android: 'apartment', web: 'apartment' }}
                  tintColor={isRecruiterSelected ? colors.primary : colors.textSecondary}
                  size={26}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText
                  variant="bodyBold"
                  colorToken={isRecruiterSelected ? 'primary' : 'text'}>
                  {t('auth.accountType.recruiterTitle')}
                </ThemedText>
                <ThemedText variant="bodySmall" colorToken="textSecondary">
                  {t('auth.accountType.recruiterDescription')}
                </ThemedText>
              </View>
            </View>
          </Card>
        </View>

        {/* Submit Button */}
        <View style={{ gap: spacing.md, marginTop: spacing.sm }}>
          <Button
            title={t('auth.accountType.submitButton')}
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            onPress={onSubmit}
            accessibilityLabel={t('auth.accountType.submitButton')}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('auth.accountType.backButton')}
            onPress={() => router.back()}
            style={styles.backButton}>
            <ThemedText variant="bodySmall" align="center" colorToken="textSecondary">
              {t('auth.accountType.backButton')}
            </ThemedText>
          </Pressable>
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
    paddingVertical: 24,
  },
  headerSection: {
    marginTop: 16,
  },
  cardsContainer: {
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
