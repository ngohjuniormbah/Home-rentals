import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

interface BadgeProps {
  label: string | number;
  color?: string;
  backgroundColor?: string;
}

/** Small pill used for counts and unit availability. */
export function Badge({
  label,
  color = colors.primary,
  backgroundColor = colors.primaryLight,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});
