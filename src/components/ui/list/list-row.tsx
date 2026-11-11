import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '../text';

export type ListRowProps = {
  title: string;
  /** One line of detail, e.g. a phone number or "Updated 2 days ago". */
  detail?: string;
  /** Usually an InitialAvatar. */
  leading?: ReactNode;
  /** Usually a PillButton or a chevron. */
  trailing?: ReactNode;
  onPress?: () => void;
};

/** At least 72px tall. Place several inside a ListCard. */
export function ListRow({ title, detail, leading, trailing, onPress }: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className="min-h-[72px] flex-row items-center gap-3 px-4 py-3 active:bg-surface-secondary">
      {leading}
      <View className="flex-1">
        <Text variant="name" numberOfLines={1}>
          {title}
        </Text>
        {detail ? (
          <Text variant="caption" tone="muted" numberOfLines={1}>
            {detail}
          </Text>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}
