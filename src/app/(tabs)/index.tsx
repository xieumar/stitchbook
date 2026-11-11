import { useState } from 'react';
import { View } from 'react-native';

import {
  ConfirmDialog,
  HeroButton,
  HeroCard,
  InitialAvatar,
  ListCard,
  ListRow,
  ListRowSkeleton,
  PillButton,
  Screen,
  SearchField,
  SectionTitle,
  StatTile,
  Tag,
  Text,
  useAppToast,
} from '@/components';

// Temporary showcase of the design system. Replaced by the real Home screen
// in the dashboard PR.
export default function Home() {
  const [query, setQuery] = useState('');
  const [confirming, setConfirming] = useState(false);
  const toast = useAppToast();

  return (
    <Screen>
      <Text variant="screenTitle">Hello, Folake</Text>

      <HeroCard title="Almost every client is measured" subtitle="43 of 48 clients have measurements">
        <HeroButton label="Add new client" icon="add" onPress={() => toast.success('Client saved')} />
      </HeroCard>

      <SearchField value={query} onChange={setQuery} />

      <View className="flex-row gap-3">
        <StatTile icon="people-outline" value={48} label="Total clients" tone="butter" />
        <StatTile icon="time-outline" value={5} label="Not measured yet" tone="lilac" />
      </View>

      <View className="gap-3">
        <SectionTitle title="Latest measurements" actionLabel="See all" />
        <ListCard>
          <ListRow
            title="Ngozi Adeyemi"
            detail="0803 412 7790"
            leading={<InitialAvatar name="Ngozi Adeyemi" />}
            trailing={<PillButton label="Measure" />}
          />
          <ListRow
            title="Amaka Okonkwo"
            detail="Bust 36 → 36.5 in"
            leading={<InitialAvatar name="Amaka Okonkwo" />}
            trailing={<Tag label="Dress" tone="butter" />}
            onPress={() => setConfirming(true)}
          />
          <ListRowSkeleton />
        </ListCard>
      </View>

      <ConfirmDialog
        visible={confirming}
        title="Archive Amaka?"
        message="Her measurements stay safe. You can restore her any time."
        confirmLabel="Archive"
        destructive
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          toast.success('Amaka archived');
        }}
      />
    </Screen>
  );
}
