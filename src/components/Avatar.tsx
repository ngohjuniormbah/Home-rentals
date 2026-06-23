import { Image, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

interface AvatarProps {
  uri: string;
  size?: number;
  /** Adds a subtle ring — used for the header avatar. */
  ring?: boolean;
}

export function Avatar({ uri, size = 44, ring = false }: AvatarProps) {
  return (
    <View
      style={[
        ring && styles.ring,
        { width: size + (ring ? 4 : 0), height: size + (ring ? 4 : 0) },
        { borderRadius: (size + 4) / 2 },
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: 2,
    borderColor: colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
