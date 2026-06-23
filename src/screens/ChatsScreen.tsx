import { FlatList, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { ChatRow } from '@/components/ChatRow';
import { ScreenHeader } from '@/components/ScreenHeader';
import { chats } from '@/data/mockData';
import { colors, spacing } from '@/theme';

export function ChatsScreen() {
  const unread = chats.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Chats"
        subtitle={unread > 0 ? `${unread} unread messages` : 'All caught up'}
      />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card flat style={styles.rowCard}>
            <ChatRow chat={item} />
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  rowCard: {
    paddingVertical: 0,
    paddingHorizontal: spacing.lg,
  },
  gap: {
    height: spacing.md,
  },
});
