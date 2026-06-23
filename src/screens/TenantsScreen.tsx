import { useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchBar } from '@/components/SearchBar';
import { TenantRow } from '@/components/TenantRow';
import { tenants } from '@/data/mockData';
import { PaymentStatus, Tenant } from '@/types';
import { colors, spacing, typography } from '@/theme';

const STATUS_ORDER: PaymentStatus[] = ['overdue', 'pending', 'paid'];
const STATUS_TITLE: Record<PaymentStatus, string> = {
  overdue: 'Overdue',
  pending: 'Pending',
  paid: 'Paid',
};

export function TenantsScreen() {
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? tenants.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.unit.toLowerCase().includes(q) ||
            t.buildingName.toLowerCase().includes(q),
        )
      : tenants;

    return STATUS_ORDER.map((status) => ({
      title: STATUS_TITLE[status],
      data: filtered.filter((t) => t.status === status),
    })).filter((section) => section.data.length > 0);
  }, [query]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Tenants" subtitle={`${tenants.length} total`} />
      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search tenants…" />
      </View>

      <SectionList<Tenant>
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>
            {section.title} · {section.data.length}
          </Text>
        )}
        renderItem={({ item, index, section }) => (
          <Card
            flat
            padded={false}
            style={[
              styles.rowCard,
              index === 0 && styles.firstRow,
              index === section.data.length - 1 && styles.lastRow,
            ]}
          >
            <View style={styles.rowInner}>
              <TenantRow tenant={item} />
              {index < section.data.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  sectionTitle: {
    ...typography.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  rowCard: {
    paddingHorizontal: spacing.lg,
  },
  rowInner: {
    position: 'relative',
  },
  firstRow: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lastRow: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});
