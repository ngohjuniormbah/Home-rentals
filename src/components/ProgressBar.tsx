import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

interface ProgressBarProps {
  /** 0–100. */
  value: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

/** Thin rounded progress indicator. */
export function ProgressBar({
  value,
  color = colors.primary,
  trackColor = colors.divider,
  height = 8,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: color, borderRadius: height },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: radius.pill,
  },
  fill: {
    height: '100%',
  },
});
