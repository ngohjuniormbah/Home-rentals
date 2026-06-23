import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { BuildingCard } from '@/components/BuildingCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { buildings } from '@/data/mockData';
import { spacing } from '@/theme';
import { TabScreenProps } from '@/navigation/types';

export function BuildingsScreen({ navigation }: TabScreenProps<'Buildings'>) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Buildings" subtitle={`${buildings.length} properties`} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {buildings.map((building) => (
          <BuildingCard
            key={building.id}
            building={building}
            onPressTenants={() => navigation.navigate('Tenants')}
            onPressChat={() => navigation.navigate('Chats')}
            onPressCall={() => Linking.openURL('tel:+254700000000')}
          />
        ))}
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
    gap: spacing.lg,
  },
});
