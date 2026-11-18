import { Pressable, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui';

export type RowActionsProps = {
  /** What the row is, for screen readers, e.g. "Chest". */
  label: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

function ActionButton({
  icon,
  label,
  disabled,
  onPress,
}: {
  icon: IconName;
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      hitSlop={4}
      className={`size-touch items-center justify-center rounded-full bg-surface shadow-card ${
        disabled ? 'opacity-40' : ''
      }`}>
      <Icon name={icon} size={20} />
    </Pressable>
  );
}

/** Move up, move down and remove buttons for one group or measurement row. */
export function RowActions({
  label,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
}: RowActionsProps) {
  return (
    <View className="flex-row gap-2">
      <ActionButton
        icon="arrow-up"
        label={`Move ${label} up`}
        disabled={!canMoveUp}
        onPress={onMoveUp}
      />
      <ActionButton
        icon="arrow-down"
        label={`Move ${label} down`}
        disabled={!canMoveDown}
        onPress={onMoveDown}
      />
      <ActionButton icon="trash-outline" label={`Remove ${label}`} onPress={onRemove} />
    </View>
  );
}
