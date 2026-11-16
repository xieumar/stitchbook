import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Icon, Text } from '@/components/ui';

export type ScreenHeaderProps = {
  title: string;
  /** Optional action on the right, e.g. an edit button. */
  trailing?: ReactNode;
  /** Defaults to router.back(). */
  onBack?: () => void;
};

/** Back button + screen title for screens pushed above the tab bar. */
export function ScreenHeader({ title, trailing, onBack }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Pressable
        onPress={onBack ?? (() => router.back())}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={4}
        className="size-touch items-center justify-center rounded-full bg-surface shadow-card">
        <Icon name="chevron-back" size={22} />
      </Pressable>
      <Text variant="screenTitle" className="flex-1" numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      {trailing}
    </View>
  );
}
