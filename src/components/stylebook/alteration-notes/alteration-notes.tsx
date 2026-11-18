import { useState } from 'react';
import { View } from 'react-native';

import { FormField, ListCard, ListRow, PillButton, SectionTitle, Text } from '@/components/ui';
import { formatDate } from '@/lib';

export type AlterationNotesProps = {
  /** Newest first, as the store keeps them. */
  notes: readonly AlterationNote[];
  onAdd: (text: string) => void;
};

/** Dated alteration notes for one client, with a box to add a new one. */
export function AlterationNotes({ notes, onAdd }: AlterationNotesProps) {
  const [text, setText] = useState('');

  const add = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
  };

  return (
    <View className="gap-3">
      <SectionTitle title="Alteration notes" />
      <FormField
        label="New note"
        value={text}
        onChangeText={setText}
        placeholder="e.g. Take in the waist by 2 cm"
        multiline
      />
      <PillButton
        label="Add note"
        icon="add"
        tone="soft"
        className="self-start"
        isDisabled={!text.trim()}
        onPress={add}
      />
      {notes.length === 0 ? (
        <Text tone="muted">No alteration notes yet.</Text>
      ) : (
        <ListCard>
          {notes.map((note) => (
            <ListRow key={note.id} title={note.text} detail={formatDate(note.createdAt)} />
          ))}
        </ListCard>
      )}
    </View>
  );
}
