import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  Input,
} from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { APP_CONFIG } from '@/constants/config';
import { ThemeMode } from '@/theme';

export default function ProfileScreen() {
  const { colors, spacing, themeMode, setThemeMode, isDark } = useAppTheme();
  const { t, currentLocale, switchLanguage } = useAppLanguage();

  const [testInput, setTestInput] = useState('');
  const [showDS, setShowDS] = useState(true);

  const themeOptions: { label: string; mode: ThemeMode }[] = [
    { label: t('profile.themeSystem'), mode: 'system' },
    { label: t('profile.themeLight'), mode: 'light' },
    { label: t('profile.themeDark'), mode: 'dark' },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['5xl'] }]}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <ThemedText variant="h2">{t('profile.title')}</ThemedText>
              <ThemedText variant="caption">
                Gérez votre profil professionnel et vos préférences
              </ThemedText>
            </View>
            <Badge label={isDark ? 'Mode Sombre' : 'Mode Clair'} variant="neutral" />
          </View>

          {/* Profile Card Summary using Avatar Component */}
          <Card variant="elevated" style={styles.profileCard}>
            <Avatar name="Yannick JobKamer" size="lg" status="online" />
            <View style={styles.profileInfo}>
              <ThemedText variant="h3">Yannick JobKamer</ThemedText>
              <ThemedText variant="bodySmall" colorToken="textSecondary">
                Développeur Mobile & Web
              </ThemedText>
              <View style={styles.badgeRow}>
                <Badge label="Cameroun" variant="default" size="sm" />
                <Badge label="Disponible" variant="success" size="sm" />
              </View>
            </View>
          </Card>

          {/* Theme Settings */}
          <Card variant="default" style={styles.sectionCard}>
            <ThemedText variant="bodyBold">{t('profile.theme')}</ThemedText>
            <View style={styles.buttonGroup}>
              {themeOptions.map((opt) => (
                <Button
                  key={opt.mode}
                  title={opt.label}
                  size="sm"
                  variant={themeMode === opt.mode ? 'primary' : 'outline'}
                  onPress={() => setThemeMode(opt.mode)}
                />
              ))}
            </View>
          </Card>

          {/* Language Settings */}
          <Card variant="default" style={styles.sectionCard}>
            <ThemedText variant="bodyBold">{t('profile.language')}</ThemedText>
            <View style={styles.buttonGroup}>
              <Button
                title="Français (FR)"
                size="sm"
                variant={currentLocale === 'fr' ? 'primary' : 'outline'}
                onPress={() => switchLanguage('fr')}
              />
              <Button
                title="English (EN)"
                size="sm"
                variant={currentLocale === 'en' ? 'primary' : 'outline'}
                onPress={() => switchLanguage('en')}
              />
            </View>
          </Card>

          {/* Official Design System Showcase Section */}
          <Card variant="elevated" style={styles.dsShowcaseCard}>
            <View style={styles.dsHeader}>
              <View>
                <ThemedText variant="h3" colorToken="primary">
                  Design System JobKamer
                </ThemedText>
                <ThemedText variant="caption">
                  Fondation UI officielle & tokens réutilisables
                </ThemedText>
              </View>
              <Button
                title={showDS ? 'Masquer' : 'Afficher'}
                size="sm"
                variant="ghost"
                onPress={() => setShowDS(!showDS)}
              />
            </View>

            {showDS && (
              <View style={styles.dsContent}>
                <Divider label="TYPOGRAPHIE" />
                <View style={styles.componentBlock}>
                  <ThemedText variant="display">Display - JobKamer</ThemedText>
                  <ThemedText variant="h1">Titre H1 - Opportunités</ThemedText>
                  <ThemedText variant="h2">Titre H2 - Réseau</ThemedText>
                  <ThemedText variant="h3">Titre H3 - Offres d'emploi</ThemedText>
                  <ThemedText variant="body">Body - Texte principal de l'application</ThemedText>
                  <ThemedText variant="bodySmall">BodySmall - Texte secondaire pour métadonnées</ThemedText>
                  <ThemedText variant="caption">Caption - Légende informative</ThemedText>
                  <ThemedText variant="label">LABEL - TOKENS & SYSTEM</ThemedText>
                </View>

                <Divider label="BOUTONS (VARIANTS & ÉTATS)" />
                <View style={styles.componentBlock}>
                  <View style={styles.rowWrap}>
                    <Button title="Primary" variant="primary" size="md" />
                    <Button title="Secondary" variant="secondary" size="md" />
                    <Button title="Outline" variant="outline" size="md" />
                  </View>
                  <View style={styles.rowWrap}>
                    <Button title="Ghost" variant="ghost" size="md" />
                    <Button title="Danger" variant="danger" size="md" />
                    <Button title="Disabled" variant="primary" disabled size="md" />
                  </View>
                  <View style={styles.rowWrap}>
                    <Button title="Loading" variant="primary" isLoading size="md" />
                    <Button title="Small" variant="secondary" size="sm" />
                    <Button title="Large" variant="outline" size="lg" />
                  </View>
                </View>

                <Divider label="ICON BUTTONS" />
                <View style={styles.rowWrap}>
                  <IconButton
                    accessibilityLabel="Home"
                    variant="primary"
                    icon={<SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor="#fff" size={20} />}
                  />
                  <IconButton
                    accessibilityLabel="Work"
                    variant="secondary"
                    icon={<SymbolView name={{ ios: 'briefcase.fill', android: 'work', web: 'work' }} tintColor="#fff" size={20} />}
                  />
                  <IconButton
                    accessibilityLabel="Search"
                    variant="outline"
                    icon={<SymbolView name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }} tintColor={colors.primary} size={20} />}
                  />
                  <IconButton
                    accessibilityLabel="Settings"
                    variant="ghost"
                    icon={<SymbolView name={{ ios: 'gear', android: 'settings', web: 'settings' }} tintColor={colors.text} size={20} />}
                  />
                  <IconButton
                    accessibilityLabel="Delete"
                    variant="danger"
                    icon={<SymbolView name={{ ios: 'trash', android: 'delete', web: 'delete' }} tintColor="#fff" size={20} />}
                  />
                </View>

                <Divider label="CHAMPS DE SAISIE (INPUT)" />
                <View style={styles.componentBlock}>
                  <Input
                    label="Intitulé du poste (Normal)"
                    placeholder="ex. Développeur React Native"
                    value={testInput}
                    onChangeText={setTestInput}
                    helperText="Entrez le titre officiel du poste recherché"
                  />
                  <Input
                    label="Email professionnel (Erreur)"
                    placeholder="contact@entreprise.cm"
                    value="invalide-email"
                    error="Format d'adresse email invalide"
                  />
                  <Input
                    label="Matricule (Désactivé)"
                    placeholder="Non modifiable"
                    disabled
                  />
                </View>

                <Divider label="BADGES SÉMANTIQUES" />
                <View style={styles.rowWrap}>
                  <Badge label="Default" variant="default" />
                  <Badge label="Success" variant="success" />
                  <Badge label="Warning" variant="warning" />
                  <Badge label="Error" variant="error" />
                  <Badge label="Info" variant="info" />
                  <Badge label="Neutral" variant="neutral" />
                </View>

                <Divider label="AVATARS (TAILLES & STATUTS)" />
                <View style={styles.rowWrap}>
                  <Avatar name="Extra Small" size="xs" />
                  <Avatar name="Small Name" size="sm" status="online" />
                  <Avatar name="Medium Person" size="md" status="busy" />
                  <Avatar name="Large Profile" size="lg" status="offline" />
                  <Avatar name="XL Profile" size="xl" status="online" shape="rounded" />
                </View>

                <Divider label="CARTES (CARD VARIANTS)" />
                <Card variant="default" style={styles.cardSample}>
                  <ThemedText variant="bodyBold">Card Default (Outlined)</ThemedText>
                  <ThemedText variant="caption">Bordure nette et surface standard</ThemedText>
                </Card>
                <Card variant="elevated" style={styles.cardSample}>
                  <ThemedText variant="bodyBold">Card Elevated (Shadow)</ThemedText>
                  <ThemedText variant="caption">Ombrage doux multiplateforme</ThemedText>
                </Card>
                <Card
                  variant="flat"
                  interactive
                  onPress={() => {}}
                  style={styles.cardSample}>
                  <ThemedText variant="bodyBold">Card Interactive (Cliquer)</ThemedText>
                  <ThemedText variant="caption">Feedback tactile au toucher</ThemedText>
                </Card>
              </View>
            )}
          </Card>

          {/* App Version Info */}
          <View style={styles.footer}>
            <ThemedText variant="caption">
              {APP_CONFIG.name} v{APP_CONFIG.version} - {APP_CONFIG.country}
            </ThemedText>
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  sectionCard: {
    gap: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dsShowcaseCard: {
    gap: 16,
  },
  dsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dsContent: {
    gap: 16,
  },
  componentBlock: {
    gap: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  cardSample: {
    gap: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});
