import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { StatusPill } from '@/components/StatusPill';
import { Tenant } from '@/types';
import { colors, spacing, typography } from '@/theme';
import { formatCurrency } from '@/utils/format';

interface TenantRowProps {
  tenant: Tenant;
  onPress?: () => void;
}

export function TenantRow({ tenant, onPress }: TenantRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Avatar uri={tenant.avatarUrl} size={48} />
      <View style={styles.info}>
        <Text style={typography.h3}>{tenant.name}</Text>
        <Text style={styles.sub}>
          {tenant.unit} · {tenant.buildingName}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.rent}>{formatCurrency(tenant.rent)}</Text>
        <StatusPill status={tenant.status} />
      </View>
    </TouchableOpacity>
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
  right: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  rent: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
