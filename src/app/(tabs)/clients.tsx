import { EmptyState, Screen, Text } from '@/components';

export default function Clients() {
  return (
    <Screen>
      <Text variant="screenTitle">Clients</Text>
      <EmptyState
        icon="people-outline"
        title="No clients yet"
        message="Add your first client to start keeping their measurements."
        actionLabel="Add client"
        onAction={() => {}}
      />
    </Screen>
  );
}
