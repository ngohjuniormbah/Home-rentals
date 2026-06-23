import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional element rendered on the right (e.g. an action button). */
  right?: React.ReactNode;
}

/** Lightweight title header for the secondary tab screens. */
export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.row}>
        <View style={styles.titles}>
          <Text style={typography.h1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titles: {
    gap: 2,
  },
  subtitle: {
    ...typography.bodyMuted,
  },
});
