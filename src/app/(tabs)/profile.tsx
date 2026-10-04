import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
  Input,
} from '@/components/ui';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useAuthStore } from '@/stores/useAuthStore';
import { authService } from '@/services/auth/authService';
import { ThemeMode } from '@/theme';

type AvailabilityOption = 'Disponible immédiatement' | 'Disponible sous 1 mois' | 'En poste, à l’écoute';
type CompanySizeOption = '1-10' | '11-50' | '51-200' | '200+';

const AVAILABILITY_CHIPS: AvailabilityOption[] = [
  'Disponible immédiatement',
  'Disponible sous 1 mois',
  'En poste, à l’écoute',
];

const COMPANY_SIZE_CHIPS: CompanySizeOption[] = ['1-10', '11-50', '51-200', '200+'];

export default function ProfileScreen() {
  const { colors, spacing, radius, themeMode, setThemeMode } = useAppTheme();
  const { t, currentLocale, switchLanguage } = useAppLanguage();
  const { user, updateUser, clearSession } = useAuthStore();

  const accountType = user?.accountType ?? 'candidate';
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Utilisateur';

  // Inline edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editHeadline, setEditHeadline] = useState(user?.headline ?? '');
  const [editCity, setEditCity] = useState(user?.city ?? '');
  const [editBio, setEditBio] = useState(user?.bio ?? '');
  const [editAvailability, setEditAvailability] = useState(user?.availability ?? '');
  const [editSector, setEditSector] = useState(user?.sector ?? '');
  const [editCompanySize, setEditCompanySize] = useState(user?.companySize ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const themeOptions: { label: string; mode: ThemeMode }[] = [
    { label: t('profile.themeSystem'), mode: 'system' },
    { label: t('profile.themeLight'), mode: 'light' },
    { label: t('profile.themeDark'), mode: 'dark' },
  ];

  const formatAvailability = (val?: string) => {
    if (!val) return t('profile.noAvailability');
    if (val === 'availableNow') return t('onboarding.availableNow', 'Disponible immédiatement');
    if (val === 'availableSoon') return t('onboarding.availableSoon', 'Disponible sous 1 mois');
    if (val === 'openToWork') return t('onboarding.openToWork', 'En poste, à l’écoute');
    return val;
  };

  const handleStartEdit = () => {
    setEditHeadline(user?.headline ?? '');
    setEditCity(user?.city ?? '');
    setEditBio(user?.bio ?? '');
    setEditAvailability(user?.availability ?? 'Disponible immédiatement');
    setEditSector(user?.sector ?? '');
    setEditCompanySize(user?.companySize ?? '11-50');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setIsSaving(true);
    updateUser({
      headline: editHeadline.trim() || undefined,
      city: editCity.trim() || undefined,
      bio: editBio.trim() || undefined,
      ...(accountType === 'candidate'
        ? { availability: editAvailability || undefined }
        : { sector: editSector.trim() || undefined, companySize: editCompanySize || undefined }),
    });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    clearSession();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { paddingBottom: spacing['5xl'] }]}
          showsVerticalScrollIndicator={false}>
          {/* Header Title */}
          <View style={styles.pageHeader}>
            <ThemedText variant="h2">{t('profile.title')}</ThemedText>
          </View>

          {/* Section Header: Profile Card */}
          <Card variant="elevated" padding="lg" style={[styles.profileCard, { gap: spacing.md }]}>
            <View style={[styles.profileHeaderRow, { gap: spacing.md }]}>
              <Avatar name={fullName} size="xl" status="online" />
              <View style={styles.profileHeaderInfo}>
                <View style={styles.badgeRow}>
                  {accountType === 'recruiter' && (
                    <Badge variant="info" label={t('profile.verified')} size="sm" />
                  )}
                  {accountType === 'candidate' && (
                    <Badge
                      variant={user?.availability ? 'success' : 'neutral'}
                      label={formatAvailability(user?.availability)}
                      size="sm"
                    />
                  )}
                </View>
                <ThemedText variant="h3">{fullName}</ThemedText>
                {user?.headline ? (
                  <ThemedText variant="bodySmall" colorToken="text">
                    {user.headline}
                  </ThemedText>
                ) : (
                  <ThemedText variant="bodySmall" colorToken="textSecondary">
                    {t('profile.noHeadline')}
                  </ThemedText>
                )}
                {Boolean(user?.city) && (
                  <View style={styles.locationRow}>
                    <SymbolView
                      name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                      tintColor={colors.textSecondary}
                      size={14}
                    />
                    <ThemedText variant="caption" colorToken="textSecondary">
                      {user?.city}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>

            {!isEditing && (
              <Button
                title={t('profile.editProfile')}
                variant="outline"
                size="sm"
                fullWidth
                onPress={handleStartEdit}
                accessibilityLabel={t('profile.editProfile')}
              />
            )}
          </Card>

          {/* Inline Edit Form */}
          {isEditing && (
            <Card variant="outlined" padding="lg" style={[styles.editCard, { gap: spacing.md }]}>
              <ThemedText variant="h3">{t('profile.editProfile')}</ThemedText>

              <Input
                label={t('onboarding.headline', 'Titre professionnel')}
                placeholder={t('profile.noHeadline')}
                value={editHeadline}
                onChangeText={setEditHeadline}
              />

              <Input
                label={t('profile.city', 'Ville')}
                placeholder={t('profile.cityPlaceholder', 'Ex : Douala, Yaoundé...')}
                value={editCity}
                onChangeText={setEditCity}
              />

              <Input
                label={t('profile.about', 'À propos')}
                placeholder={t('profile.noBio')}
                value={editBio}
                onChangeText={setEditBio}
                multiline
                numberOfLines={3}
                style={{ height: 80, textAlignVertical: 'top' }}
              />

              {accountType === 'candidate' && (
                <View style={{ gap: spacing.xs }}>
                  <ThemedText variant="label" colorToken="text">
                    {t('profile.availability')}
                  </ThemedText>
                  <View style={[styles.chipsContainer, { gap: spacing.xs }]}>
                    {AVAILABILITY_CHIPS.map((chip) => {
                      const isSelected = editAvailability === chip;
                      return (
                        <Pressable
                          key={chip}
                          accessibilityRole="button"
                          accessibilityLabel={chip}
                          accessibilityState={{ selected: isSelected }}
                          onPress={() => setEditAvailability(chip)}
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
                            {chip}
                          </ThemedText>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              )}

              {accountType === 'recruiter' && (
                <View style={{ gap: spacing.md }}>
                  <Input
                    label={t('profile.sector', "Secteur d'activité")}
                    placeholder="Ex : Tech, Finance, BTP..."
                    value={editSector}
                    onChangeText={setEditSector}
                  />

                  <View style={{ gap: spacing.xs }}>
                    <ThemedText variant="label" colorToken="text">
                      {t('profile.companySize')}
                    </ThemedText>
                    <View style={[styles.sizeChipsRow, { gap: spacing.xs }]}>
                      {COMPANY_SIZE_CHIPS.map((size) => {
                        const isSelected = editCompanySize === size;
                        return (
                          <Pressable
                            key={size}
                            accessibilityRole="button"
                            accessibilityLabel={`${t('profile.companySize')}: ${size}`}
                            accessibilityState={{ selected: isSelected }}
                            onPress={() => setEditCompanySize(size)}
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

              <View style={[styles.editActionsRow, { gap: spacing.sm, marginTop: spacing.xs }]}>
                <View style={styles.halfWidth}>
                  <Button
                    title={t('profile.cancel')}
                    variant="outline"
                    size="md"
                    fullWidth
                    onPress={handleCancelEdit}
                  />
                </View>
                <View style={styles.halfWidth}>
                  <Button
                    title={t('profile.save')}
                    variant="primary"
                    size="md"
                    fullWidth
                    isLoading={isSaving}
                    onPress={handleSaveEdit}
                  />
                </View>
              </View>
            </Card>
          )}

          {/* Section Bio */}
          <Card variant="outlined" padding="lg" style={[styles.sectionCard, { gap: spacing.xs }]}>
            <ThemedText variant="h3">{t('profile.about')}</ThemedText>
            {user?.bio ? (
              <ThemedText variant="body" colorToken="text" style={styles.bioText}>
                {user.bio}
              </ThemedText>
            ) : (
              <ThemedText variant="body" colorToken="textSecondary">
                {t('profile.noBio')}
              </ThemedText>
            )}
          </Card>

          {/* Section Infos Spécifiques */}
          {accountType === 'candidate' && (
            <Card variant="outlined" padding="lg" style={[styles.sectionCard, { gap: spacing.xs }]}>
              <ThemedText variant="h3">{t('profile.availability')}</ThemedText>
              <ThemedText
                variant="body"
                colorToken={user?.availability ? 'text' : 'textSecondary'}>
                {formatAvailability(user?.availability)}
              </ThemedText>
            </Card>
          )}

          {accountType === 'recruiter' && (
            <Card variant="outlined" padding="lg" style={[styles.sectionCard, { gap: spacing.sm }]}>
              <ThemedText variant="h3">{t('profile.company')}</ThemedText>
              <View style={styles.specRow}>
                <ThemedText variant="bodySmall" weight="600" colorToken="textSecondary">
                  {t('profile.sector')} :
                </ThemedText>
                <ThemedText variant="body" colorToken={user?.sector ? 'text' : 'textSecondary'}>
                  {user?.sector || t('profile.notSpecified')}
                </ThemedText>
              </View>
              <View style={styles.specRow}>
                <ThemedText variant="bodySmall" weight="600" colorToken="textSecondary">
                  {t('profile.companySize')} :
                </ThemedText>
                <ThemedText variant="body" colorToken={user?.companySize ? 'text' : 'textSecondary'}>
                  {user?.companySize || t('profile.notSpecified')}
                </ThemedText>
              </View>
            </Card>
          )}

          {/* Section Paramètres */}
          <Card variant="outlined" padding="lg" style={[styles.sectionCard, { gap: spacing.md }]}>
            <ThemedText variant="h3">{t('profile.theme')}</ThemedText>
            <View style={[styles.buttonGroup, { gap: spacing.xs }]}>
              {themeOptions.map((opt) => (
                <Button
                  key={opt.mode}
                  title={opt.label}
                  variant={themeMode === opt.mode ? 'primary' : 'outline'}
                  size="sm"
                  onPress={() => setThemeMode(opt.mode)}
                />
              ))}
            </View>

            <Divider />

            <ThemedText variant="h3">{t('profile.language')}</ThemedText>
            <View style={[styles.buttonGroup, { gap: spacing.xs }]}>
              <Button
                title="Français"
                variant={currentLocale === 'fr' ? 'primary' : 'outline'}
                size="sm"
                onPress={() => switchLanguage('fr')}
              />
              <Button
                title="English"
                variant={currentLocale === 'en' ? 'primary' : 'outline'}
                size="sm"
                onPress={() => switchLanguage('en')}
              />
            </View>

            <Divider />

            <Button
              title={t('profile.logout')}
              variant="danger"
              size="md"
              fullWidth
              onPress={handleLogout}
              accessibilityLabel={t('profile.logout')}
            />
          </Card>
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
  pageHeader: {
    paddingVertical: 4,
  },
  profileCard: {
    width: '100%',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileHeaderInfo: {
    flex: 1,
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  editCard: {
    width: '100%',
  },
  chipsContainer: {
    flexDirection: 'column',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  halfWidth: {
    flex: 1,
  },
  sectionCard: {
    width: '100%',
  },
  bioText: {
    lineHeight: 22,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
