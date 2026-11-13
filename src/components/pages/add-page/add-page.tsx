import { router } from 'expo-router';

import { Screen, ScreenHeader } from '@/components/layout';
import { Icon, IconBadge, ListCard, ListRow, useAppToast } from '@/components/ui';

/** The centre "Add" sheet: register a client, or (soon) start a measurement. */
export function AddPage() {
  const toast = useAppToast();

  return (
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Add" onBack={() => router.back()} />
      <ListCard>
        <ListRow
          title="New client"
          detail="Register a client with their contact details"
          leading={<IconBadge name="person-add-outline" tone="hero" />}
          trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
          onPress={() => router.replace('/client/new')}
        />
        <ListRow
          title="New measurement"
          detail="Pick a client, then record measurements"
          leading={<IconBadge name="resize-outline" tone="mint" />}
          trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
          onPress={() => toast.info('Coming soon', 'Recording measurements arrives in a later update.')}
        />
      </ListCard>
    </Screen>
  );
}
