import { Colors, Spacing, Radius, Layout } from '@/theme';

export { Colors, Spacing, Radius, Layout };
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export const BottomTabInset = Layout.bottomInset;
export const MaxContentWidth = Layout.maxContentWidth;
