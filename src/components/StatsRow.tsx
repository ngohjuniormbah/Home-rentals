import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { PortfolioStats } from '@/types';
import { colors, spacing, typography } from '@/theme';

interface StatItem {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
  color: string;
}

interface StatsRowProps {
  stats: PortfolioStats;
}

/** The four-up metric strip that overlaps the home header. */
export function StatsRow({ stats }: StatsRowProps) {
  const items: StatItem[] = [
    { icon: 'business', value: stats.buildings, label: 'Buildings', color: colors.primary },
    { icon: 'people', value: stats.tenants, label: 'Tenants', color: colors.primary },
    { icon: 'checkmark-circle', value: stats.paid, label: 'Paid', color: colors.success },
    { icon: 'alert-circle', value: stats.overdue, label: 'Overdue', color: colors.danger },
  ];

  return (
    <Card style={styles.card}>
      {items.map((item, index) => (
        <View key={item.label} style={styles.itemRow}>
          {index > 0 ? <View style={styles.divider} /> : null}
          <View style={styles.item}>
            <Ionicons name={item.icon} size={22} color={item.color} />
            <Text style={[typography.statValue, styles.value]}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: colors.divider,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  value: {
    marginTop: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
