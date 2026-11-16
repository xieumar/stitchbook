import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ClientDirectory } from '@/components/clients';
import { Screen } from '@/components/layout';
import { AddButton, SearchField, SegmentedTabs, Text } from '@/components/ui';
import { useClientList } from '@/hooks';
import type { ClientStatusFilter } from '@/lib';
import { useStoresHydrated } from '@/store';

export function ClientsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ClientStatusFilter>('active');
  const hydrated = useStoresHydrated();
  const { clients, counts, total } = useClientList(query, status);

  const options = [
    { value: 'active', label: `Active (${counts.active})` },
    { value: 'archived', label: `Archived (${counts.archived})` },
  ] as const;

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <Text variant="screenTitle">Clients</Text>
        <AddButton label="Add client" onPress={() => router.push('/client/new')} />
      </View>

      <View className="gap-3">
        <SearchField value={query} onChange={setQuery} />
        <SegmentedTabs options={options} value={status} onChange={setStatus} className="self-start" />
      </View>

      <ClientDirectory
        clients={clients}
        status={status}
        query={query}
        isEmpty={total === 0}
        isLoading={!hydrated}
        onAddClient={() => router.push('/client/new')}
      />
    </Screen>
  );
}
