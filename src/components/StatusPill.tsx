import { StyleSheet, Text, View } from 'react-native';

import { PaymentStatus } from '@/types';
import { colors, radius, spacing } from '@/theme';

const CONFIG: Record<PaymentStatus, { label: string; color: string; bg: string }> = {
  paid: { label: 'Paid', color: colors.success, bg: colors.successLight },
  pending: { label: 'Pending', color: colors.warning, bg: '#FEF3E2' },
  overdue: { label: 'Overdue', color: colors.danger, bg: colors.dangerLight },
};

export function StatusPill({ status }: { status: PaymentStatus }) {
  const { label, color, bg } = CONFIG[status];
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
