export const ROUTES = {
  HOME: '/',
  TABS: '/(tabs)',
  JOBS: '/(tabs)/jobs',
  NETWORK: '/(tabs)/network',
  MESSAGES: '/(tabs)/messages',
  PROFILE: '/(tabs)/profile',
} as const;

export const TAB_BAR_ICONS = {
  feed: {
    ios: 'house.fill',
    android: 'home',
    web: 'home',
  },
  jobs: {
    ios: 'briefcase.fill',
    android: 'work',
    web: 'work',
  },
  network: {
    ios: 'person.2.fill',
    android: 'group',
    web: 'people',
  },
  messages: {
    ios: 'bubble.left.and.bubble.right.fill',
    android: 'chat',
    web: 'chat',
  },
  profile: {
    ios: 'person.crop.circle.fill',
    android: 'account_circle',
    web: 'person',
  },
} as const;
