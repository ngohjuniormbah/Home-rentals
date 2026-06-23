import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { owner } from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';
import { useState } from 'react';

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  /** Render a toggle instead of a chevron. */
  toggle?: boolean;
  danger?: boolean;
}

interface Group {
  title: string;
  rows: Row[];
}

const GROUPS: Group[] = [
  {
    title: 'Account',
    rows: [
      { icon: 'person-outline', label: 'Profile' },
      { icon: 'card-outline', label: 'Payment methods' },
      { icon: 'business-outline', label: 'My properties' },
    ],
  },
  {
    title: 'Preferences',
    rows: [
      { icon: 'notifications-outline', label: 'Push notifications', toggle: true },
      { icon: 'mail-outline', label: 'Email reminders', toggle: true },
      { icon: 'language-outline', label: 'Language' },
    ],
  },
  {
    title: 'Support',
    rows: [
      { icon: 'help-circle-outline', label: 'Help center' },
      { icon: 'shield-checkmark-outline', label: 'Privacy & security' },
      { icon: 'log-out-outline', label: 'Sign out', danger: true },
    ],
  },
];

export function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Push notifications': true,
    'Email reminders': false,
  });

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profile}>
          <Avatar uri={owner.avatarUrl} size={56} />
          <View style={styles.profileInfo}>
            <Text style={typography.h3}>{owner.name}</Text>
            <Text style={typography.bodyMuted}>Property owner</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Card>

        {GROUPS.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <Card padded={false}>
              {group.rows.map((row, index) => (
                <View key={row.label}>
                  {index > 0 ? <View style={styles.divider} /> : null}
                  <TouchableOpacity
                    style={styles.row}
                    activeOpacity={row.toggle ? 1 : 0.6}
                  >
                    <View
                      style={[
                        styles.iconWrap,
                        row.danger && { backgroundColor: colors.dangerLight },
                      ]}
                    >
                      <Ionicons
                        name={row.icon}
                        size={20}
                        color={row.danger ? colors.danger : colors.primary}
                      />
                    </View>
                    <Text
                      style={[
                        styles.rowLabel,
                        row.danger && { color: colors.danger },
                      ]}
                    >
                      {row.label}
                    </Text>
                    {row.toggle ? (
                      <Switch
                        value={toggles[row.label] ?? false}
                        onValueChange={(v) =>
                          setToggles((prev) => ({ ...prev, [row.label]: v }))
                        }
                        trackColor={{ true: colors.primary, false: colors.border }}
                        thumbColor={colors.surface}
                      />
                    ) : !row.danger ? (
                      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              ))}
            </Card>
          </View>
        ))}

        <Text style={styles.version}>Home Rentals v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  group: {
    marginTop: spacing.xl,
  },
  groupTitle: {
    ...typography.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: spacing.lg + 38 + spacing.md,
  },
  version: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
