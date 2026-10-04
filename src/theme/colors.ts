/**
 * JobKamer Official Design System - Color Tokens
 * Supports Light Mode and Dark Mode with WCAG AA compliance
 */

export const Colors = {
  // Base brand references
  brand: {
    primary: '#1A6BCC',
    primaryLight: '#4A8FDE',
    primaryDark: '#124B91',
    secondary: '#27AE60',
    secondaryLight: '#48C77F',
    secondaryDark: '#1E8449',
    error: '#E74C3C',
  },
  // Cameroon national accents
  cameroon: {
    green: '#007A5E',
    red: '#CE1126',
    yellow: '#FCD116',
  },
  light: {
    // Brand
    primary: '#1A6BCC',
    primaryLight: '#4A8FDE',
    primaryDark: '#124B91',
    primaryForeground: '#FFFFFF',
    secondary: '#27AE60',
    secondaryLight: '#48C77F',
    secondaryDark: '#1E8449',
    secondaryForeground: '#FFFFFF',

    // Surfaces & Backgrounds
    background: '#F5F7FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    backgroundSubtle: '#F8FAFC',
    backgroundElement: '#ECEFF4',
    backgroundSelected: '#E2E8F0',

    // Typography
    text: '#2C2C2C',
    textSecondary: '#7F8C8D',
    textDisabled: '#BDC3C7',

    // Borders
    border: '#E2E8F0',
    borderMuted: '#F0F4F8',

    // Feedback & Semantic states
    success: '#27AE60',
    successLight: '#E9F7EF',
    warning: '#F39C12',
    warningLight: '#FEF9E7',
    error: '#E74C3C',
    errorLight: '#FDEDEC',
    info: '#1A6BCC',
    infoLight: '#E8F1FC',

    // Navigation & Interactive
    tint: '#1A6BCC',
    tabIconDefault: '#7F8C8D',
    tabIconSelected: '#1A6BCC',
  },
  dark: {
    // Brand
    primary: '#3B82F6', // Adjusted for high contrast against dark background #1A1A2E
    primaryLight: '#60A5FA',
    primaryDark: '#1E40AF',
    primaryForeground: '#FFFFFF',
    secondary: '#2ECC71',
    secondaryLight: '#58D68D',
    secondaryDark: '#1E8449',
    secondaryForeground: '#FFFFFF',

    // Surfaces & Backgrounds
    background: '#1A1A2E',
    surface: '#24243E',
    surfaceElevated: '#2E2E4D',
    card: '#24243E',
    backgroundSubtle: '#1F1F35',
    backgroundElement: '#2A2A44',
    backgroundSelected: '#343454',

    // Typography
    text: '#F5F7FA',
    textSecondary: '#A0ABC0',
    textDisabled: '#555B70',

    // Borders
    border: '#2E2E48',
    borderMuted: '#25253C',

    // Feedback & Semantic states
    success: '#2ECC71',
    successLight: '#18382B',
    warning: '#F5A623',
    warningLight: '#3D2F14',
    error: '#FF6B6B',
    errorLight: '#3D1C1C',
    info: '#4DA3FF',
    infoLight: '#162A45',

    // Navigation & Interactive
    tint: '#3B82F6',
    tabIconDefault: '#A0ABC0',
    tabIconSelected: '#3B82F6',
  },
};

export type ThemeColors = Record<keyof typeof Colors.light, string>;
export type ColorToken = keyof typeof Colors.light;
