import { router } from 'expo-router';
import { View } from 'react-native';

import { HeroCard } from '@/components/layout';
import { HeroButton, IconBadge, ListCard, ListRow, Tag, type IconName } from '@/components/ui';
import { formatDate } from '@/lib';

import { ArchiveClientAction } from '../archive-client-action';

export type ClientOverviewProps = {
  client: ClientRecord;
};

type Detail = { label: string; value: string; icon: IconName };

/** Hero card with the edit action, followed by the client's contact details. */
export function ClientOverview({ client }: ClientOverviewProps) {
  const details: Detail[] = [
    client.phone ? { label: 'Phone', value: client.phone, icon: 'call-outline' } : null,
    client.email ? { label: 'Email', value: client.email, icon: 'mail-outline' } : null,
    client.notes ? { label: 'Notes', value: client.notes, icon: 'document-text-outline' } : null,
    { label: 'Client since', value: formatDate(client.createdAt), icon: 'calendar-outline' },
  ].filter((detail): detail is Detail => detail !== null);

  return (
    <View className="gap-section">
      <HeroCard
        title={client.name}
        subtitle={client.archivedAt ? 'Archived client' : 'Active client'}>
        <HeroButton
          label="Edit details"
          icon="create-outline"
          onPress={() => router.push({ pathname: '/client/[id]/edit', params: { id: client.id } })}
        />
      </HeroCard>

      {client.archivedAt ? <Tag label={`Archived ${formatDate(client.archivedAt)}`} tone="butter" /> : null}

      <ListCard>
        {details.map((detail) => (
          <ListRow
            key={detail.label}
            title={detail.value}
            detail={detail.label}
            leading={<IconBadge name={detail.icon} tone="butter" />}
          />
        ))}
      </ListCard>

      <ArchiveClientAction client={client} />
    </View>
  );
}
