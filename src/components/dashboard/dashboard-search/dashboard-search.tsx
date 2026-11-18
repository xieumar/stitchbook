import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { ClientRow } from '@/components/clients';
import { ListCard, PillButton, SearchField, Text } from '@/components/ui';
import { useAllClients } from '@/hooks';
import { quickSearchClients } from '@/lib';

/** Find a client from Home: type a name or phone, tap a result to open their profile. */
export function DashboardSearch() {
  const clients = useAllClients();
  const [query, setQuery] = useState('');
  const { results, total } = useMemo(() => quickSearchClients(clients, query), [clients, query]);
  const searching = query.trim() !== '';

  return (
    <View className="gap-3">
      <SearchField value={query} onChange={setQuery} />
      {searching && results.length === 0 ? (
        <Text tone="muted">No active client matches “{query.trim()}”.</Text>
      ) : null}
      {results.length > 0 ? (
        <ListCard>
          {results.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </ListCard>
      ) : null}
      {total > results.length ? (
        <PillButton
          label={`See all ${total} results`}
          tone="soft"
          className="self-start"
          onPress={() => router.push({ pathname: '/clients', params: { query: query.trim() } })}
        />
      ) : null}
    </View>
  );
}
