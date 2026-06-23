import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search tenants, units, buildings…',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
});
