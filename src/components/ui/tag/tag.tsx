import { View } from 'react-native';

import { TILE_BG, type TileTone } from '@/constants';

import { Text } from '../text';

export type TagProps = {
  label: string;
  /** White by default; tinted tones use the pastel palette. */
  tone?: TileTone;
  className?: string;
};

/** Small pill label, e.g. "Dress" or "Active". */
export function Tag({ label, tone = 'white', className }: TagProps) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${TILE_BG[tone]} ${className ?? ''}`}>
      <Text variant="tabLabel">{label}</Text>
    </View>
  );
}
