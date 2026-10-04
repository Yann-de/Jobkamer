import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SymbolView } from 'expo-symbols';

import { Container, Button, Input, Card } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { authService } from '@/services/auth/authService';

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordScreen() {
  const { spacing, colors, radius } = useAppTheme();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await authService.resetPassword(data.email);
      setIsSuccess(true);
    } catch {
      // Handle error if needed
    }
  };

  return (
    <Container useSafeArea scrollable centerContent padding="lg" style={styles.container}>
      <View style={[styles.content, { gap: spacing.xl }]}>
        {/* Header Section */}
        <View style={[styles.headerSection, { gap: spacing.xs }]}>
          <ThemedText variant="h1" colorToken="primary">
            JobKamer
          </ThemedText>
          <ThemedText variant="h2">
            {t('auth.forgotPassword.title')}
          </ThemedText>
          <ThemedText variant="bodySmall" colorToken="textSecondary">
            {t('auth.forgotPassword.subtitle')}
          </ThemedText>
        </View>

        {isSuccess ? (
          <Card
            variant="elevated"
            padding="lg"
            style={{
              borderColor: colors.success,
              borderWidth: 1,
              backgroundColor: colors.surface,
            }}>
            <View style={[styles.successContent, { gap: spacing.md }]}>
              <View
                style={[
                  styles.successIconBox,
                  {
                    backgroundColor: colors.successLight,
                    borderRadius: radius.full,
                  },
                ]}>
                <SymbolView
                  name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                  tintColor={colors.success}
                  size={32}
                />
              </View>
              <ThemedText variant="body" align="center">
                {t('auth.forgotPassword.successMessage')}
              </ThemedText>
              <Button
                title={t('auth.forgotPassword.backToLogin')}
                variant="primary"
                size="md"
                fullWidth
                onPress={() => router.replace('/(auth)/login')}
                accessibilityLabel={t('auth.forgotPassword.backToLogin')}
              />
            </View>
          </Card>
        ) : (
          <View style={[styles.form, { gap: spacing.lg }]}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: t('auth.forgotPassword.errors.emailRequired'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('auth.forgotPassword.errors.emailInvalid'),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth.forgotPassword.emailLabel')}
                  placeholder={t('auth.forgotPassword.emailPlaceholder')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />

            <Button
              title={t('auth.forgotPassword.submitButton')}
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              accessibilityLabel={t('auth.forgotPassword.submitButton')}
            />

            <View style={styles.footerSection}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('auth.forgotPassword.backToLogin')}
                onPress={() => router.back()}>
                <ThemedText variant="bodySmall" align="center" colorToken="textSecondary">
                  {t('auth.forgotPassword.backToLogin')}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        )}
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
  form: {
    width: '100%',
  },
  successContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successIconBox: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 8,
  },
});
