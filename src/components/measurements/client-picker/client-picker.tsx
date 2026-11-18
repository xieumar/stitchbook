import { EmptyState, Icon, InitialAvatar, ListCard, ListRow } from '@/components/ui';

export type ClientPickerProps = {
  clients: readonly ClientRecord[];
  onPick: (client: ClientRecord) => void;
  onAddClient: () => void;
};

/** Choose which active client the new measurements are for. */
export function ClientPicker({ clients, onPick, onAddClient }: ClientPickerProps) {
  if (clients.length === 0) {
    return (
      <EmptyState
        icon="person-outline"
        title="No clients yet"
        message="Add a client first, then you can record their measurements."
        actionLabel="Add client"
        onAction={onAddClient}
      />
    );
  }

  return (
    <ListCard>
      {clients.map((client) => (
        <ListRow
          key={client.id}
          title={client.name}
          detail={client.phone ?? client.email ?? 'No contact details'}
          leading={<InitialAvatar name={client.name} photoUri={client.photoUri} />}
          trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
          onPress={() => onPick(client)}
        />
      ))}
    </ListCard>
  );
}
