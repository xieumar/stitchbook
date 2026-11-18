import { router } from 'expo-router';
import { View } from 'react-native';

import { EmptyState, ListCard, ListRow, PillButton, SectionTitle, Tag } from '@/components/ui';
import { hasPreferences } from '@/lib';

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

/** The profile's Stylebook tab: saved style preferences, or an empty state to add them. */
export function StylebookTab({ clientId, clientName, entry }: StylebookTabProps) {
  const edit = () => router.push({ pathname: '/client/[id]/stylebook', params: { id: clientId } });

  if (!entry || !hasPreferences(entry)) {
    return (
      <EmptyState
        icon="color-palette-outline"
        tone="butter"
        title="Stylebook is empty"
        message={`Style preferences for ${clientName} will be kept here.`}
        actionLabel="Add preferences"
        onAction={edit}
      />
    );
  }

  return (
    <View className="gap-section">
      <PillButton label="Edit preferences" icon="create-outline" tone="soft" onPress={edit} />
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
    </View>
  );
}
