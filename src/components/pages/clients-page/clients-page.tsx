import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ClientDirectory } from '@/components/clients';
import { Screen } from '@/components/layout';
import {
  AddButton,
  EmptyState,
  PillButton,
  SearchField,
  SegmentedTabs,
  Text,
} from '@/components/ui';
import { useClientList } from '@/hooks';
import {
  CLIENT_LIST_FILTER_LABEL,
  parseClientListFilter,
  type ClientListFilter,
  type ClientStatusFilter,
} from '@/lib';
import { useStoresHydrated } from '@/store';

export function ClientsPage() {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ClientStatusFilter>('active');
  // A dashboard tile opens this tab with ?filter=..., e.g. "not-measured".
  const [listFilter, setListFilter] = useState<ClientListFilter>(() =>
    parseClientListFilter(params.filter),
  );
  const hydrated = useStoresHydrated();
  const { clients, counts, total } = useClientList(query, status, listFilter);

  useEffect(() => {
    setListFilter(parseClientListFilter(params.filter));
    if (params.filter) setStatus('active');
  }, [params.filter]);

  const clearFilter = () => {
    setListFilter('all');
    router.setParams({ filter: undefined });
  };

  const options = [
    { value: 'active', label: `Active (${counts.active})` },
    { value: 'archived', label: `Archived (${counts.archived})` },
  ] as const;

  const filtering = listFilter !== 'all';

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <Text variant="screenTitle">Clients</Text>
        <AddButton label="Add client" onPress={() => router.push('/client/new')} />
      </View>

      <View className="gap-3">
        <SearchField value={query} onChange={setQuery} />
        {filtering ? (
          <PillButton
            label={`${CLIENT_LIST_FILTER_LABEL[listFilter]} · Clear`}
            icon="close"
            tone="soft"
            className="self-start"
            onPress={clearFilter}
          />
        ) : (
          <SegmentedTabs
            options={options}
            value={status}
            onChange={setStatus}
            className="self-start"
          />
        )}
      </View>

      {filtering && hydrated && clients.length === 0 ? (
        <EmptyState
          icon="people-outline"
          tone="mint"
          title="Nothing here yet"
          message={`No clients match “${CLIENT_LIST_FILTER_LABEL[listFilter]}” right now.`}
          actionLabel="Show all clients"
          onAction={clearFilter}
        />
      ) : (
        <ClientDirectory
          clients={clients}
          status={status}
          query={query}
          isEmpty={total === 0}
          isLoading={!hydrated}
          onAddClient={() => router.push('/client/new')}
        />
      )}
    </Screen>
  );
}
