import { DefaultTheme, Theme } from '@react-navigation/native';

import { colors } from './colors';

export { colors } from './colors';
export { spacing, radius } from './spacing';
export { typography } from './typography';

/** React Navigation theme so the navigator background matches the app. */
export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

/** Soft elevation shared by cards. */
export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;
