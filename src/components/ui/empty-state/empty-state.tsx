import { View } from 'react-native';

import { TILE_BG } from '@/constants';

import { PillButton } from '../button';
import { Icon, type IconName } from '../icon';
import { Text } from '../text';

export type EmptyStateProps = {
  icon: IconName;
  title: string;
  message: string;
  tone?: 'butter' | 'lilac' | 'mint' | 'sky' | 'hero';
  actionLabel?: string;
  onAction?: () => void;
};

/** Friendly empty / error state with one clear next step. */
export function EmptyState({
  icon,
  title,
  message,
  tone = 'lilac',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="items-center gap-3 px-6 py-10">
      <View className={`mb-2 size-[72px] items-center justify-center rounded-full ${TILE_BG[tone]}`}>
        <Icon name={icon} size={30} />
      </View>
      <Text variant="sectionTitle" className="text-center">
        {title}
      </Text>
      <Text tone="muted" className="text-center">
        {message}
      </Text>
      {actionLabel && onAction ? (
        <View className="mt-3">
          <PillButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}
