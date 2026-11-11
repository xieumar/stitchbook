import type { ComponentRef, Ref } from 'react';
import { Pressable, type PressableProps } from 'react-native';

import { Icon, Text, type IconName } from '@/components/ui';

export type TabButtonProps = PressableProps & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  label: string;
  icon: IconName;
  activeIcon: IconName;
  /** Injected by expo-router's TabTrigger. */
  isFocused?: boolean;
};

/** One destination in the floating tab bar. Active = accent colour, heavier label. */
export function TabButton({ label, icon, activeIcon, isFocused, ref, ...props }: TabButtonProps) {
  return (
    <Pressable
      ref={ref}
      {...props}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: Boolean(isFocused) }}
      style={{ flexDirection: 'column' }}
      className="h-full min-w-touch flex-1 items-center justify-center gap-1">
      <Icon name={isFocused ? activeIcon : icon} size={22} tone={isFocused ? 'accent' : 'inactive'} />
      <Text variant={isFocused ? 'tabLabelActive' : 'tabLabel'} tone={isFocused ? 'accent' : 'inactive'}>
        {label}
      </Text>
    </Pressable>
  );
}
