import { TabTrigger } from 'expo-router/ui';
import { View } from 'react-native';

import { TabButton } from './tab-button';
import { useTabBarOffset } from './use-tab-bar-offset';

export type FloatingTabBarProps = {
  /** The centre Add button (add client / start measuring). */
  onAddPress: () => void;
};

/**
 * Floating pill tab bar: Home, Clients, Add, Measures, Settings.
 * 74px tall, inset 14px from the screen edges. Must be rendered inside
 * expo-router's <Tabs>, alongside a <TabList> (direct child of <Tabs>) that
 * declares the routes: this component only draws the visible buttons.
 */
export function FloatingTabBar({ onAddPress }: FloatingTabBarProps) {
  const offset = useTabBarOffset();

  return (
    <View
      className="absolute left-[14px] right-[14px] h-[74px] flex-row items-center rounded-full bg-surface px-2 shadow-float"
      style={{ bottom: offset }}>
      <TabTrigger name="index" asChild>
        <TabButton label="Home" icon="home-outline" activeIcon="home" />
      </TabTrigger>
      <TabTrigger name="clients" asChild>
        <TabButton label="Clients" icon="people-outline" activeIcon="people" />
      </TabTrigger>

      {/* Opens the add screen rather than a tab, so it is a plain button, never "selected". */}
      <TabButton
        label="Add"
        icon="add-circle-outline"
        activeIcon="add-circle"
        accessibilityRole="button"
        onPress={onAddPress}
      />

      <TabTrigger name="measures" asChild>
        <TabButton label="Measures" icon="resize-outline" activeIcon="resize" />
      </TabTrigger>
      <TabTrigger name="settings" asChild>
        <TabButton label="Settings" icon="settings-outline" activeIcon="settings" />
      </TabTrigger>
    </View>
  );
}
