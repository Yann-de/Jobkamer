import { create } from 'zustand';

interface SettingsState {
  // Confidentialité
  profileVisibility: 'public' | 'private';
  showAvailability: boolean;
  allowSearchIndexing: boolean;
  cvVisibleToRecruiters: boolean;
  // Notifications préférences
  notifyNewMessage: boolean;
  notifyApplicationUpdate: boolean;
  notifyJobMatch: boolean;
  notifySystemInfo: boolean;
  // Actions
  setProfileVisibility: (v: 'public' | 'private') => void;
  toggleSetting: (
    key: keyof Omit<
      SettingsState,
      'profileVisibility' | 'setProfileVisibility' | 'toggleSetting'
    >,
  ) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  profileVisibility: 'public',
  showAvailability: true,
  allowSearchIndexing: true,
  cvVisibleToRecruiters: true,
  notifyNewMessage: true,
  notifyApplicationUpdate: true,
  notifyJobMatch: true,
  notifySystemInfo: false,
  setProfileVisibility: (v) => set({ profileVisibility: v }),
  toggleSetting: (key) => set((state) => ({ [key]: !state[key] })),
}));
