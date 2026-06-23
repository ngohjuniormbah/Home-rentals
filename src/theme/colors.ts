/**
 * App color palette. Centralised so screens and components stay consistent
 * and a future dark-mode / white-label theme is a single edit away.
 */
export const colors = {
  // Brand
  primary: '#2563EB',
  primaryDark: '#1D4FD7',
  primaryLight: '#EAF1FE',

  // Status
  success: '#16A34A',
  successLight: '#E7F6EC',
  danger: '#EF4444',
  dangerLight: '#FDECEC',
  warning: '#F59E0B',

  // Neutrals
  background: '#F2F5FA',
  surface: '#FFFFFF',
  border: '#E6EAF1',
  divider: '#EEF1F6',

  // Text
  textPrimary: '#1A1D26',
  textSecondary: '#6B7280',
  textMuted: '#9AA3B2',
  textInverse: '#FFFFFF',
  textOnPrimaryMuted: '#C7D7FB',

  // Misc
  shadow: '#0B1B3F',
  whatsapp: '#25D366',
} as const;

export type AppColors = typeof colors;
