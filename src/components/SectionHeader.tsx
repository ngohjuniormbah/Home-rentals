import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

interface SectionHeaderProps {
  title: string;
  /** Optional right-side action label, e.g. "See all". */
  actionLabel?: string;
  onActionPress?: () => void;
  /** Optional trailing element (e.g. a count badge). */
  trailing?: React.ReactNode;
}

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  trailing,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titleRow}>
        <Text style={typography.h2}>{title}</Text>
        {trailing}
      </View>
      {actionLabel ? (
        <TouchableOpacity onPress={onActionPress} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
