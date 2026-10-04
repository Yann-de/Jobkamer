import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Avatar, Badge, Button, Card, Divider, Input } from '@/components/ui';
import { getJobById } from '@/features/jobs/jobsMocks';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuthStore } from '@/stores/useAuthStore';
import { Job } from '@/types';

function translateWorkplace(type: Job['workplaceType']): string {
  switch (type) {
    case 'on-site':
      return 'Présentiel';
    case 'hybrid':
      return 'Hybride';
    case 'remote':
      return 'Télétravail';
    default:
      return type;
  }
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing } = useAppTheme();
  const { user } = useAuthStore();

  const job = getJobById(typeof id === 'string' ? id : '');

  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [letter, setLetter] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  const email = user?.email ?? '';
  const isCandidate = user?.accountType === 'candidate';

  const handleCloseModal = () => {
    setShowModal(false);
    setPhone('');
    setLetter('');
    setPhoneError(undefined);
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!phone.trim()) {
      setPhoneError('Téléphone requis');
      return;
    }

    setPhoneError(undefined);
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowModal(false);
    setPhone('');
    setLetter('');
    setPhoneError(undefined);
    setIsSubmitting(false);
    Alert.alert(
      'Candidature envoyée !',
      'Le recruteur vous contactera prochainement.',
    );
  };

  if (!job) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={[styles.notFound, { padding: spacing.lg, gap: spacing.md }]}>
            <ThemedText variant="h3">Offre introuvable</ThemedText>
            <Button title="Retour" variant="outline" onPress={() => router.back()} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            {
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.sm,
              paddingBottom: spacing['4xl'],
              gap: spacing.lg,
            },
          ]}
          showsVerticalScrollIndicator={false}>
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
            <ThemedText variant="bodyBold">Retour</ThemedText>
          </Pressable>

          <View style={[styles.headerRow, { gap: spacing.md }]}>
            <Avatar name={job.companyName} size="lg" />
            <View style={styles.headerText}>
              <ThemedText variant="h2">{job.title}</ThemedText>
              <ThemedText variant="body" colorToken="textSecondary">
                {job.companyName}
              </ThemedText>
              <ThemedText variant="caption" colorToken="textSecondary">
                {job.city}
              </ThemedText>
            </View>
          </View>

          <View style={styles.badgesRow}>
            <Badge label={job.contractType} variant="secondary" size="sm" />
            <Badge
              label={translateWorkplace(job.workplaceType)}
              variant="neutral"
              size="sm"
            />
          </View>

          {job.salaryMin ? (
            <ThemedText variant="bodyBold" colorToken="primary">
              {`${job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()} FCFA`}
            </ThemedText>
          ) : (
            <ThemedText variant="body" colorToken="textSecondary">
              Salaire à négocier
            </ThemedText>
          )}

          <Divider />

          <View style={{ gap: spacing.sm }}>
            <ThemedText variant="h3">Description du poste</ThemedText>
            <ThemedText variant="body" style={styles.description}>
              {job.description}
            </ThemedText>
          </View>

          {isCandidate && (
            <Button
              title="Postuler"
              variant="primary"
              fullWidth
              onPress={() => setShowModal(true)}
            />
          )}
        </ScrollView>

        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={handleCloseModal}>
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
                  <ThemedText variant="h3">Postuler — {job.title}</ThemedText>

                  <View style={{ gap: spacing.xs }}>
                    <ThemedText variant="caption" colorToken="textSecondary">
                      Nom complet
                    </ThemedText>
                    <ThemedText variant="bodyBold">{fullName}</ThemedText>
                  </View>

                  <View style={{ gap: spacing.xs }}>
                    <ThemedText variant="caption" colorToken="textSecondary">
                      Email
                    </ThemedText>
                    <ThemedText variant="body">{email}</ThemedText>
                  </View>

                  <Divider />

                  <Input
                    label="Téléphone"
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
                      label="Lettre de motivation"
                      placeholder="Lettre de motivation (optionnel)"
                      value={letter}
                      onChangeText={(value) => setLetter(value.slice(0, 500))}
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
                      {letter.length}/500
                    </ThemedText>
                  </View>

                  <ThemedText variant="caption" colorToken="textSecondary">
                    Upload CV disponible prochainement
                  </ThemedText>

                  <View style={[styles.actions, { gap: spacing.sm }]}>
                    <Button
                      title="Envoyer ma candidature"
                      variant="primary"
                      fullWidth
                      isLoading={isSubmitting}
                      onPress={handleSubmit}
                    />
                    <Button
                      title="Annuler"
                      variant="outline"
                      fullWidth
                      disabled={isSubmitting}
                      onPress={handleCloseModal}
                    />
                  </View>
                </ScrollView>
              </Card>
            </KeyboardAvoidingView>
          </View>
        </Modal>
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
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  description: {
    lineHeight: 22,
  },
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
