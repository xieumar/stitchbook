import { router } from 'expo-router';

import { KeyboardForm, Screen, ScreenHeader } from '@/components/layout';
import { StylebookForm } from '@/components/stylebook';
import { EmptyState, Text, useAppToast } from '@/components/ui';
import { useClient, useStylebook } from '@/hooks';
import { useStylebookStore } from '@/store';

export type StylebookFormPageProps = {
  clientId: string;
};

/** Edit one client's style preferences. */
export function StylebookFormPage({ clientId }: StylebookFormPageProps) {
  const client = useClient(clientId);
  const entry = useStylebook(clientId);
  const toast = useAppToast();
  const setPreferences = useStylebookStore((state) => state.setPreferences);

  if (!client) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Stylebook" />
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
    <KeyboardForm>
      <ScreenHeader title="Stylebook" />
      <Text tone="muted">Style preferences for {client.name}</Text>
      <StylebookForm
        entry={entry}
        onSubmit={(preferences) => {
          setPreferences(client.id, preferences);
          toast.success('Preferences saved', client.name);
          router.back();
        }}
      />
    </KeyboardForm>
  );
}
