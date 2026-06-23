import { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { BuildingCard } from '@/components/BuildingCard';
import { Card } from '@/components/Card';
import { OverdueItem } from '@/components/OverdueItem';
import { ProgressBar } from '@/components/ProgressBar';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { StatsRow } from '@/components/StatsRow';
import { buildings, overdueTenants, owner, portfolioStats } from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';
import { greeting } from '@/utils/format';
import { TabScreenProps } from '@/navigation/types';

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const featured = buildings[0];

  const call = (phone: string) => Linking.openURL(`tel:${phone}`);

  return (
    <View style={styles.container}>
      {/* Blue hero header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.ownerName}>{owner.name}</Text>
          </View>
          <Avatar uri={owner.avatarUrl} size={48} ring />
        </View>

        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <View style={styles.collectedRow}>
          <ProgressBar
            value={portfolioStats.collectedPercent}
            color={colors.textInverse}
            trackColor="rgba(255,255,255,0.3)"
            height={6}
          />
          <Text style={styles.collectedText}>
            {portfolioStats.collectedPercent}% collected
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      >
        {/* Stats strip overlapping the header */}
        <View style={styles.statsWrap}>
          <StatsRow stats={portfolioStats} />
        </View>

        {/* My Buildings */}
        <View style={styles.section}>
          <SectionHeader
            title="My Buildings"
            actionLabel="See all"
            onActionPress={() => navigation.navigate('Buildings')}
          />
          <BuildingCard
            building={featured}
            onPressTenants={() => navigation.navigate('Tenants')}
            onPressChat={() => navigation.navigate('Chats')}
            onPressCall={() => call('+254700000000')}
          />
        </View>

        {/* Overdue */}
        <View style={styles.section}>
          <SectionHeader
            title="Overdue"
            trailing={
              <View style={styles.overdueBadge}>
                <Text style={styles.overdueBadgeText}>{portfolioStats.overdue}</Text>
              </View>
            }
          />
          <Card>
            {overdueTenants.map((tenant, index) => (
              <OverdueItem
                key={tenant.id}
                tenant={tenant}
                showDivider={index > 0}
                onPressChat={() => navigation.navigate('Chats')}
              />
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl + spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 14,
    color: colors.textOnPrimaryMuted,
  },
  ownerName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textInverse,
    marginTop: 2,
  },
  searchWrap: {
    marginTop: spacing.lg,
  },
  collectedRow: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  collectedText: {
    alignSelf: 'flex-end',
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  statsWrap: {
    paddingHorizontal: spacing.xl,
    marginTop: -spacing.xxxl,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xxl,
  },
  overdueBadge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueBadgeText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
});
