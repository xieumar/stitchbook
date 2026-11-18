import { router } from 'expo-router';
import { View } from 'react-native';

import { ListCard, ListRow, PillButton, SectionTitle, Tag, Text, useAppToast } from '@/components/ui';
import { hasPreferences } from '@/lib';
import { useStylebookStore } from '@/store';

import { AlterationNotes } from '../alteration-notes';

export type StylebookTabProps = {
  clientId: string;
  clientName: string;
  entry?: StylebookEntry;
};

function TagGroup({ title, values }: { title: string; values: readonly string[] }) {
  if (values.length === 0) return null;
  return (
    <View className="gap-3">
      <SectionTitle title={title} />
      <View className="flex-row flex-wrap gap-2">
        {values.map((value) => (
          <Tag key={value} label={value} tone="butter" />
        ))}
      </View>
    </View>
  );
}

/** The profile's Stylebook tab: style preferences, then alteration notes. */
export function StylebookTab({ clientId, clientName, entry }: StylebookTabProps) {
  const toast = useAppToast();
  const addAlterationNote = useStylebookStore((state) => state.addAlterationNote);
  const edit = () => router.push({ pathname: '/client/[id]/stylebook', params: { id: clientId } });
  const saved = hasPreferences(entry);

  return (
    <View className="gap-section">
      <PillButton
        label={saved ? 'Edit preferences' : 'Add preferences'}
        icon={saved ? 'create-outline' : 'add'}
        tone="soft"
        onPress={edit}
      />
      {entry && saved ? (
        <>
          <TagGroup title="Styles" values={entry.styles} />
          <TagGroup title="Colours" values={entry.colors} />
          <TagGroup title="Fabrics" values={entry.fabrics} />
          {entry.fit || entry.instructions ? (
            <ListCard>
              {entry.fit ? <ListRow title={entry.fit} detail="Fit" /> : null}
              {entry.instructions ? (
                <ListRow title={entry.instructions} detail="Special instructions" />
              ) : null}
            </ListCard>
          ) : null}
        </>
      ) : (
        <Text tone="muted">Style preferences for {clientName} will be kept here.</Text>
      )}
      <AlterationNotes
        notes={entry?.alterationNotes ?? []}
        onAdd={(text) => {
          addAlterationNote(clientId, text);
          toast.success('Note added');
        }}
      />
    </View>
  );
}
