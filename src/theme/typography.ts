import { TextStyle } from 'react-native';

import { colors } from './colors';

/** Shared text styles. Keeps font sizes / weights coherent across screens. */
export const typography = {
  h1: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  bodyMuted: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
} satisfies Record<string, TextStyle>;
