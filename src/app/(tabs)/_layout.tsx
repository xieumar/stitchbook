import { router } from 'expo-router';
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';

import { FloatingTabBar } from '@/components';

export default function TabsLayout() {
  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot />
      {/* Declares the routes. Must be a direct child of <Tabs>; the visible bar is separate. */}
      <TabList style={{ display: 'none' }}>
        <TabTrigger name="index" href="/" />
        <TabTrigger name="clients" href="/clients" />
        <TabTrigger name="measures" href="/measures" />
        <TabTrigger name="settings" href="/settings" />
      </TabList>
      <FloatingTabBar onAddPress={() => router.push('/add')} />
    </Tabs>
  );
}
