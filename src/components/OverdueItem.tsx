import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Tenant } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';
import { formatCurrency, formatOverdue } from '@/utils/format';

interface OverdueItemProps {
  tenant: Tenant;
  showDivider?: boolean;
  onPressChat?: () => void;
}

/** A single overdue-tenant row. */
export function OverdueItem({ tenant, showDivider, onPressChat }: OverdueItemProps) {
  return (
    <View>
      {showDivider ? <View style={styles.divider} /> : null}
      <View style={styles.row}>
        <Avatar uri={tenant.avatarUrl} size={48} />

        <View style={styles.info}>
          <Text style={typography.h3}>{tenant.name}</Text>
          <Text style={styles.sub}>
            {tenant.unit} · {tenant.buildingName}
          </Text>
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.amount}>{formatCurrency(tenant.rent)}</Text>
          <Text style={styles.overdue}>{formatOverdue(tenant.daysOverdue ?? 0)}</Text>
        </View>

        <TouchableOpacity style={styles.chatButton} onPress={onPressChat} hitSlop={6}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  sub: {
    ...typography.bodyMuted,
  },
  amountBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },
  overdue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});
