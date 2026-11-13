import { TabList, TabTrigger } from 'expo-router/ui';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddButton } from '@/components/ui';

import { TabButton } from './tab-button';

export type FloatingTabBarProps = {
  /** The raised centre button (add client / start measuring). */
  onAddPress: () => void;
};

/**
 * Floating pill tab bar: Home, Clients, raised Add, Measures, Settings.
 * 74px tall, inset 14px from the screen edges. Must be rendered inside
 * expo-router's <Tabs>.
 */
export function FloatingTabBar({ onAddPress }: FloatingTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Registers the routes; the visible bar below uses the triggers directly. */}
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="index" href="/" />
        <TabTrigger name="clients" href="/clients" />
        <TabTrigger name="measures" href="/measures" />
        <TabTrigger name="settings" href="/settings" />
      </TabList>

      <View
        className="absolute left-[14px] right-[14px] h-[74px] flex-row items-center rounded-full bg-surface px-2 shadow-float"
        style={{ bottom: Math.max(insets.bottom, 14) }}>
        <TabTrigger name="index" asChild>
          <TabButton label="Home" icon="home-outline" activeIcon="home" />
        </TabTrigger>
        <TabTrigger name="clients" asChild>
          <TabButton label="Clients" icon="people-outline" activeIcon="people" />
        </TabTrigger>

        <View className="w-[64px] items-center" style={{ transform: [{ translateY: -16 }] }}>
          <AddButton size={56} label="Add" onPress={onAddPress} />
        </View>

        <TabTrigger name="measures" asChild>
          <TabButton label="Measures" icon="resize-outline" activeIcon="resize" />
        </TabTrigger>
        <TabTrigger name="settings" asChild>
          <TabButton label="Settings" icon="settings-outline" activeIcon="settings" />
        </TabTrigger>
      </View>
    </>
  );
}
