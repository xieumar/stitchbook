import { router } from 'expo-router';
import { useMemo } from 'react';

import { Screen } from '@/components/layout';
import { RecordHistoryList } from '@/components/measurements';
import { EmptyState, Text } from '@/components/ui';
import { useAllClients, useAllRecords } from '@/hooks';

/** The Measures tab: every saved record across clients, newest first. */
export function MeasuresPage() {
  const records = useAllRecords();
  const clients = useAllClients();
  const clientNames = useMemo(
    () => Object.fromEntries(clients.map((client) => [client.id, client.name])),
    [clients],
  );

  return (
    <Screen>
      <Text variant="screenTitle">Measures</Text>
      {records.length === 0 ? (
        <EmptyState
          icon="resize-outline"
          tone="mint"
          title="No measurements yet"
          message="Records you save for your clients will appear here."
          actionLabel="Record measurements"
          onAction={() => router.push('/measurement/new')}
        />
      ) : (
        <RecordHistoryList records={records} clientNames={clientNames} />
      )}
    </Screen>
  );
}
