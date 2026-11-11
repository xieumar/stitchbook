import { router } from 'expo-router';
import { TabSlot, Tabs } from 'expo-router/ui';

import { FloatingTabBar } from '@/components';

export default function TabsLayout() {
  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot />
      <FloatingTabBar onAddPress={() => router.push('/add')} />
    </Tabs>
  );
}
