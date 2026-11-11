import { Pressable, View } from 'react-native';

import { TILE_BG } from '@/constants';

import { Icon, type IconName } from '../icon';
import { Text } from '../text';

export type StatTileProps = {
  icon: IconName;
  value: number | string;
  label: string;
  tone?: 'butter' | 'lilac' | 'mint' | 'sky';
  /** Each tile links into the filtered list it counts. */
  onPress?: () => void;
};

/** Pastel tile with a white icon circle, big number and label. No shadow. */
export function StatTile({ icon, value, label, tone = 'butter', onPress }: StatTileProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${value} ${label}`}
      className={`flex-1 rounded-tile p-4 ${TILE_BG[tone]}`}>
      <View className="mb-3 size-8 items-center justify-center rounded-full bg-white">
        <Icon name={icon} size={18} />
      </View>
      <Text variant="bigNumber">{value}</Text>
      <Text variant="caption" tone="muted">
        {label}
      </Text>
    </Pressable>
  );
}
