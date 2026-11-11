import { Pressable, View } from 'react-native';

import { Text } from '../text';

export type SectionTitleProps = {
  title: string;
  /** Optional link on the right, e.g. "See all". */
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionTitle({ title, actionLabel, onActionPress }: SectionTitleProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text variant="sectionTitle" accessibilityRole="header">
        {title}
      </Text>
      {actionLabel ? (
        <Pressable
          onPress={onActionPress}
          accessibilityRole="button"
          className="min-h-touch min-w-touch items-end justify-center">
          <Text variant="caption" tone="accent" className="font-outfit-medium">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
