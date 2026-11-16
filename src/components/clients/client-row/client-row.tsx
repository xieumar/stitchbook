import { router } from 'expo-router';

import { Icon, InitialAvatar, ListRow, Tag } from '@/components/ui';

export type ClientRowProps = {
  client: ClientRecord;
};

/** One client in the directory: avatar, name, one line of contact detail. */
export function ClientRow({ client }: ClientRowProps) {
  return (
    <ListRow
      title={client.name}
      detail={client.phone ?? client.email ?? 'No contact details'}
      leading={<InitialAvatar name={client.name} photoUri={client.photoUri} />}
      trailing={
        client.archivedAt ? <Tag label="Archived" /> : <Icon name="chevron-forward" tone="muted" size={20} />
      }
      onPress={() => router.push({ pathname: '/client/[id]', params: { id: client.id } })}
    />
  );
}
