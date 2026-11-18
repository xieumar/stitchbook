import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { FormField, Icon, PillButton, Text } from '@/components/ui';
import { addChip, removeChip } from '@/lib';

export type ChipFieldProps = {
  label: string;
  placeholder?: string;
  chips: readonly string[];
  onChange: (chips: string[]) => void;
};

/** A list of short values (styles, colours, fabrics): type one, add it, tap a chip to remove it. */
export function ChipField({ label, placeholder, chips, onChange }: ChipFieldProps) {
  const [text, setText] = useState('');

  const add = () => {
    onChange(addChip(chips, text));
    setText('');
  };

  return (
    <View className="gap-3">
      <FormField
        label={label}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        returnKeyType="done"
        onSubmitEditing={add}
      />
      <PillButton
        label={`Add ${label.toLowerCase()}`}
        icon="add"
        tone="soft"
        className="self-start"
        isDisabled={!text.trim()}
        onPress={add}
      />
      {chips.length > 0 ? (
        <View className="flex-row flex-wrap gap-2">
          {chips.map((chip) => (
            <Pressable
              key={chip}
              onPress={() => onChange(removeChip(chips, chip))}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${chip}`}
              className="min-h-touch flex-row items-center gap-1 rounded-full bg-surface px-4 shadow-card">
              <Text variant="tabLabel">{chip}</Text>
              <Icon name="close" size={16} tone="muted" />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
