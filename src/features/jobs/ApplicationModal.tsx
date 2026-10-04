import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Button, Card, Divider, Input } from '@/components/ui';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/stores/useAuthStore';

interface ApplicationModalProps {
  visible: boolean;
  jobTitle: string;
  jobId: string;
  onClose: () => void;
}

export function ApplicationModal({
  visible,
  jobTitle,
  jobId,
  onClose,
}: ApplicationModalProps) {
  const { colors, spacing } = useAppTheme();
  const { t } = useAppLanguage();
  const { user } = useAuthStore();

  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  const email = user?.email ?? '';

  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setPhone('');
    setCoverLetter('');
    setPhoneError(undefined);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setPhoneError(t('jobs.phoneRequired'));
      return;
    }

    setPhoneError(undefined);
    setIsSubmitting(true);

    try {
      void jobId;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
      Alert.alert(t('jobs.applicationSent'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <Card
            variant="elevated"
            style={[styles.modalCard, { backgroundColor: colors.surface }]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: spacing.md }}>
              <ThemedText variant="h3">
                {t('jobs.applyTitle')} — {jobTitle}
              </ThemedText>

              <View style={{ gap: spacing.xs }}>
                <ThemedText variant="caption" colorToken="textSecondary">
                  {t('jobs.fullName')}
                </ThemedText>
                <ThemedText variant="bodyBold">{fullName}</ThemedText>
              </View>

              <View style={{ gap: spacing.xs }}>
                <ThemedText variant="caption" colorToken="textSecondary">
                  {t('jobs.email')}
                </ThemedText>
                <ThemedText variant="body">{email}</ThemedText>
              </View>

              <Divider />

              <Input
                label={t('jobs.phone')}
                placeholder="+237 6XX XXX XXX"
                value={phone}
                onChangeText={(value) => {
                  setPhone(value);
                  if (phoneError) setPhoneError(undefined);
                }}
                keyboardType="phone-pad"
                error={phoneError}
                autoComplete="tel"
              />

              <View style={{ gap: spacing.xs }}>
                <Input
                  label={t('jobs.coverLetter')}
                  placeholder={t('jobs.coverLetter')}
                  value={coverLetter}
                  onChangeText={(value) => setCoverLetter(value.slice(0, 500))}
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  textAlignVertical="top"
                  style={styles.coverLetterInput}
                />
                <ThemedText
                  variant="caption"
                  colorToken="textSecondary"
                  style={styles.counter}>
                  {coverLetter.length}/500
                </ThemedText>
              </View>

              <ThemedText variant="caption" colorToken="textSecondary">
                {t('jobs.cvComingSoon')}
              </ThemedText>

              <View style={[styles.actions, { gap: spacing.sm }]}>
                <Button
                  title={t('jobs.sendApplication')}
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  onPress={handleSubmit}
                />
                <Button
                  title={t('common.cancel')}
                  variant="outline"
                  fullWidth
                  disabled={isSubmitting}
                  onPress={handleClose}
                />
              </View>
            </ScrollView>
          </Card>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  keyboardView: {
    maxHeight: '90%',
  },
  modalCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 32,
  },
  coverLetterInput: {
    minHeight: 100,
  },
  counter: {
    textAlign: 'right',
  },
  actions: {
    marginTop: 8,
  },
});
