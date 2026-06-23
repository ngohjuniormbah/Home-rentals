import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import { shadows } from '@/theme/index';

interface CardProps extends ViewProps {
  /** Disable the soft drop shadow (e.g. for nested cards). */
  flat?: boolean;
  padded?: boolean;
}

/** White rounded surface used throughout the app. */
export function Card({ flat, padded = true, style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        padded && styles.padded,
        !flat && shadows.card,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
  },
  padded: {
    padding: spacing.lg,
  },
});
