/**
 * JobKamer Design System - Color Palette
 * Designed for professional networking and employment in Cameroon & Africa
 */

export const Colors = {
  // Brand Colors
  brand: {
    primary: '#059669', // Emerald 600 - Main professional brand green
    primaryDark: '#047857', // Emerald 700
    primaryLight: '#34d399', // Emerald 400
    secondary: '#0284c7', // Sky 600 - Accent blue for opportunities
    secondaryDark: '#0369a1',
  },
  // National touch accents
  cameroon: {
    green: '#007A5E',
    red: '#CE1126',
    yellow: '#FCD116',
  },
  light: {
    text: '#0f172a', // Slate 900
    textSecondary: '#64748b', // Slate 500
    textMuted: '#94a3b8', // Slate 400
    background: '#ffffff',
    backgroundSubtle: '#f8fafc', // Slate 50
    backgroundElement: '#f1f5f9', // Slate 100
    backgroundSelected: '#e2e8f0', // Slate 200
    card: '#ffffff',
    border: '#e2e8f0', // Slate 200
    borderMuted: '#f1f5f9',
    primary: '#059669',
    primaryForeground: '#ffffff',
    tint: '#059669',
    tabIconDefault: '#64748b',
    tabIconSelected: '#059669',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0284c7',
  },
  dark: {
    text: '#f8fafc', // Slate 50
    textSecondary: '#94a3b8', // Slate 400
    textMuted: '#64748b', // Slate 500
    background: '#090d16', // Deep Slate
    backgroundSubtle: '#0f172a', // Slate 900
    backgroundElement: '#1e293b', // Slate 800
    backgroundSelected: '#334155', // Slate 700
    card: '#0f172a',
    border: '#1e293b',
    borderMuted: '#162032',
    primary: '#10b981',
    primaryForeground: '#ffffff',
    tint: '#10b981',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#10b981',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#38bdf8',
  },
};

export type ThemeColors = Record<keyof typeof Colors.light, string>;
export type ColorToken = keyof typeof Colors.light;
