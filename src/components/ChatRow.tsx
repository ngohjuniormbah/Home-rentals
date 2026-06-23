import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { ChatThread } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';

interface ChatRowProps {
  chat: ChatThread;
  onPress?: () => void;
}

export function ChatRow({ chat, onPress }: ChatRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Avatar uri={chat.avatarUrl} size={50} />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={typography.h3} numberOfLines={1}>
            {chat.title}
          </Text>
          {chat.isGroup ? (
            <Ionicons name="people" size={14} color={colors.textMuted} />
          ) : null}
        </View>
        <Text style={styles.last} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.time}>{chat.timestamp}</Text>
        {chat.unreadCount > 0 ? (
          <View style={styles.unread}>
            <Text style={styles.unreadText}>{chat.unreadCount}</Text>
          </View>
        ) : (
          <View style={styles.unreadPlaceholder} />
        )}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  last: {
    ...typography.bodyMuted,
  },
  right: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  time: {
    ...typography.caption,
  },
  unread: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: colors.textInverse,
    fontSize: 11,
    fontWeight: '700',
  },
  unreadPlaceholder: {
    height: 20,
  },
});
