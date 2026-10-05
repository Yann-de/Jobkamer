import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Container, Button, Input } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/stores/useAuthStore';
import { authService } from '@/services/auth/authService';
import { LoginCredentials } from '@/features/auth/types';

export default function LoginScreen() {
  const { spacing, colors } = useAppTheme();
  const { t } = useTranslation();
  const { setSession } = useAuthStore();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const session = await authService.login(data);
      setSession(session.user, session.token);
      router.replace('/(tabs)');
    } catch (error: any) {
      const code = error?.code ?? '';
      let message = t('auth.login.errors.loginFailed');

      if (
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) {
        message = 'Email ou mot de passe incorrect';
      } else if (code === 'auth/too-many-requests') {
        message = 'Trop de tentatives. Réessayez plus tard.';
      } else if (error?.message?.includes('network')) {
        message = 'Vérifiez votre connexion internet.';
      }

      setError('root', { message });
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
            {t('auth.login.title')}
          </ThemedText>
          <ThemedText variant="bodySmall" colorToken="textSecondary">
            {t('auth.login.subtitle')}
          </ThemedText>
        </View>

        {/* Global form error */}
        {errors.root && (
          <ThemedText variant="captionBold" colorToken="error">
            {errors.root.message}
          </ThemedText>
        )}

        {/* Form Fields */}
        <View style={[styles.form, { gap: spacing.lg }]}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: t('auth.login.errors.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('auth.login.errors.emailInvalid'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.login.emailLabel')}
                placeholder={t('auth.login.emailPlaceholder')}
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

          <View style={{ gap: spacing.xs }}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: t('auth.login.errors.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('auth.login.errors.passwordMin'),
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('auth.login.passwordLabel')}
                  placeholder={t('auth.login.passwordPlaceholder')}
                  secureTextEntry
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('auth.login.forgotPassword')}
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotPasswordPressable}>
              <ThemedText variant="captionBold" colorToken="primary">
                {t('auth.login.forgotPassword')}
              </ThemedText>
            </Pressable>
          </View>

          <Button
            title={t('auth.login.submitButton')}
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            accessibilityLabel={t('auth.login.submitButton')}
          />
        </View>

        {/* Register Link */}
        <View style={styles.footerSection}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('auth.login.noAccount')}
            onPress={() => router.push('/(auth)/register')}>
            <ThemedText variant="bodySmall" align="center" colorToken="textSecondary">
              {t('auth.login.noAccount')}
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
  form: {
    width: '100%',
  },
  forgotPasswordPressable: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 12,
  },
});
