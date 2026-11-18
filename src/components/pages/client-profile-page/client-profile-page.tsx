import { router } from 'expo-router';
import { useState } from 'react';

import { ClientActivityList, ClientOverview } from '@/components/clients';
import { Screen, ScreenHeader } from '@/components/layout';
import { RecordHistoryList } from '@/components/measurements';
import { StylebookTab } from '@/components/stylebook';
import { EmptyState, PillButton, SegmentedTabs, type SegmentedTabsOption } from '@/components/ui';
import { useClient, useClientActivity, useClientRecords, useStylebook } from '@/hooks';

type ProfileTab = 'overview' | 'measurements' | 'stylebook' | 'activity';

const TABS: readonly SegmentedTabsOption<ProfileTab>[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'measurements', label: 'Measures' },
  { value: 'stylebook', label: 'Stylebook' },
  { value: 'activity', label: 'Activity' },
];

export type ClientProfilePageProps = {
  clientId: string;
};

/** A client's profile: overview, measurements, stylebook and activity tabs. */
export function ClientProfilePage({ clientId }: ClientProfilePageProps) {
  const client = useClient(clientId);
  const activity = useClientActivity(clientId);
  const records = useClientRecords(clientId);
  const stylebook = useStylebook(clientId);
  const [tab, setTab] = useState<ProfileTab>('overview');

  const recordMeasurements = () =>
    router.push({ pathname: '/measurement/new', params: { clientId } });

  if (!client) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Client" />
        <EmptyState
          icon="person-outline"
          title="Client not found"
          message="This client may have been removed."
          actionLabel="Back to clients"
          onAction={() => router.replace('/clients')}
        />
      </Screen>
    );
  }

  return (
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Profile" />
      <SegmentedTabs options={TABS} value={tab} onChange={setTab} compact />

      {tab === 'overview' ? <ClientOverview client={client} /> : null}
      {tab === 'measurements' ? (
        records.length === 0 ? (
          <EmptyState
            icon="resize-outline"
            tone="mint"
            title="No measurements yet"
            message={`Measurements saved for ${client.name} will be listed here.`}
            actionLabel="Record measurements"
            onAction={recordMeasurements}
          />
        ) : (
          <>
            <PillButton label="New measurements" icon="add" onPress={recordMeasurements} />
            <RecordHistoryList records={records} />
          </>
        )
      ) : null}
      {tab === 'stylebook' ? (
        <StylebookTab clientId={clientId} clientName={client.name} entry={stylebook} />
      ) : null}
      {tab === 'activity' ? <ClientActivityList entries={activity} /> : null}
    </Screen>
  );
}
