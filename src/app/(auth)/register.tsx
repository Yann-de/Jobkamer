import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Container, Button, Input } from '@/components/ui';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRegistrationStore } from '@/stores/useRegistrationStore';

interface RegisterStep1Form {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
}

export default function RegisterScreen() {
  const { spacing } = useAppTheme();
  const { t } = useTranslation();
  const { data: savedData, setRegistrationData } = useRegistrationStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep1Form>({
    defaultValues: {
      firstName: savedData.firstName ?? '',
      lastName: savedData.lastName ?? '',
      email: savedData.email ?? '',
      password: savedData.password ?? '',
      phone: savedData.phone ?? '',
      city: savedData.city ?? '',
    },
    mode: 'onBlur',
  });

  const onContinue = (formData: RegisterStep1Form) => {
    setRegistrationData(formData);
    router.push('/(auth)/account-type');
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
            {t('auth.register.title')}
          </ThemedText>
          <ThemedText variant="bodySmall" colorToken="textSecondary">
            {t('auth.register.subtitle')}
          </ThemedText>
        </View>

        {/* Form Fields */}
        <View style={[styles.form, { gap: spacing.md }]}>
          <View style={[styles.row, { gap: spacing.md }]}>
            <View style={styles.halfWidth}>
              <Controller
                control={control}
                name="firstName"
                rules={{
                  required: t('auth.register.errors.firstNameRequired'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.register.firstNameLabel')}
                    placeholder={t('auth.register.firstNamePlaceholder')}
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.firstName?.message}
                  />
                )}
              />
            </View>

            <View style={styles.halfWidth}>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: t('auth.register.errors.lastNameRequired'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.register.lastNameLabel')}
                    placeholder={t('auth.register.lastNamePlaceholder')}
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

          <Controller
            control={control}
            name="email"
            rules={{
              required: t('auth.register.errors.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('auth.register.errors.emailInvalid'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.emailLabel')}
                placeholder={t('auth.register.emailPlaceholder')}
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

          <Controller
            control={control}
            name="password"
            rules={{
              required: t('auth.register.errors.passwordRequired'),
              minLength: {
                value: 8,
                message: t('auth.register.errors.passwordMin'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.passwordLabel')}
                placeholder={t('auth.register.passwordPlaceholder')}
                secureTextEntry
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.phoneLabel')}
                placeholder={t('auth.register.phonePlaceholder')}
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('auth.register.cityLabel')}
                placeholder={t('auth.register.cityPlaceholder')}
                autoCapitalize="words"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <View style={{ marginTop: spacing.sm }}>
            <Button
              title={t('auth.register.continueButton')}
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleSubmit(onContinue)}
              accessibilityLabel={t('auth.register.continueButton')}
            />
          </View>
        </View>

        {/* Login Link */}
        <View style={styles.footerSection}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('auth.register.alreadyHaveAccount')}
            onPress={() => router.push('/(auth)/login')}>
            <ThemedText variant="bodySmall" align="center" colorToken="textSecondary">
              {t('auth.register.alreadyHaveAccount')}
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
  row: {
    flexDirection: 'row',
  },
  halfWidth: {
    flex: 1,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 12,
  },
});
