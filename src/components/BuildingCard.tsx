import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Building } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';
import { formatCurrency, percent } from '@/utils/format';

interface BuildingCardProps {
  building: Building;
  onPressTenants?: () => void;
  onPressChat?: () => void;
  onPressCall?: () => void;
}

/** Rich card showing a building's occupancy and collection progress. */
export function BuildingCard({
  building,
  onPressTenants,
  onPressChat,
  onPressCall,
}: BuildingCardProps) {
  const occupancy = percent(building.occupiedUnits, building.totalUnits);

  return (
    <Card padded={false} style={styles.card}>
      <Image source={{ uri: building.imageUrl }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={typography.h3}>{building.name}</Text>
          <Badge label={`${building.occupiedUnits}/${building.totalUnits} units`} />
        </View>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={15} color={colors.textMuted} />
          <Text style={styles.address}>{building.address}</Text>
        </View>

        <View style={styles.metricLabelRow}>
          <Text style={typography.label}>Occupancy</Text>
          <Text style={styles.occupancyValue}>{occupancy}%</Text>
        </View>
        <ProgressBar value={occupancy} />

        <View style={styles.collectionRow}>
          <View>
            <Text style={typography.label}>Collected</Text>
            <Text style={styles.collected}>{formatCurrency(building.collected)}</Text>
          </View>
          <View style={styles.alignEnd}>
            <Text style={typography.label}>Expected</Text>
            <Text style={styles.expected}>{formatCurrency(building.expected)}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.primaryAction} onPress={onPressTenants}>
            <Ionicons name="people" size={18} color={colors.textInverse} />
            <Text style={styles.primaryActionText}>Tenants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction} onPress={onPressChat}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primary} />
            <Text style={styles.secondaryActionText}>Group Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callAction} onPress={onPressCall}>
            <Ionicons name="call" size={20} color={colors.textInverse} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.divider,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  address: {
    ...typography.bodyMuted,
  },
  metricLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occupancyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  collected: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.success,
    marginTop: 2,
  },
  expected: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: radius.md,
  },
  primaryActionText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    height: 48,
    borderRadius: radius.md,
  },
  secondaryActionText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  callAction: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
