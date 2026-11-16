import { router } from 'expo-router';

import { ClientForm } from '@/components/clients';
import { KeyboardForm, Screen, ScreenHeader } from '@/components/layout';
import { EmptyState, useAppToast } from '@/components/ui';
import { useClient } from '@/hooks';
import { useClientsStore } from '@/store';

export type ClientFormPageProps = {
  /** Edit this client. Omit to add a new one. */
  clientId?: string;
};

/** Add or edit a client. A new client opens on their profile once saved. */
export function ClientFormPage({ clientId }: ClientFormPageProps) {
  const client = useClient(clientId);
  const toast = useAppToast();
  const addClient = useClientsStore((state) => state.addClient);
  const updateClient = useClientsStore((state) => state.updateClient);

  if (clientId && !client) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Edit client" />
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

  const handleSubmit = (input: ClientInput) => {
    if (client) {
      updateClient(client.id, input);
      toast.success('Changes saved');
      router.back();
      return;
    }
    const id = addClient(input);
    toast.success('Client added', input.name);
    router.replace({ pathname: '/client/[id]', params: { id } });
  };

  return (
    <KeyboardForm>
      <ScreenHeader title={client ? 'Edit client' : 'New client'} />
      <ClientForm
        client={client}
        submitLabel={client ? 'Save changes' : 'Add client'}
        onSubmit={handleSubmit}
      />
    </KeyboardForm>
  );
}
