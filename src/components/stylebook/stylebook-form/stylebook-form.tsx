import { useState } from 'react';
import { View } from 'react-native';

import { FormField, PillButton } from '@/components/ui';
import { addChip, entryToDraft, toStylebookPreferences } from '@/lib';

import { ChipField } from '../chip-field';

export type StylebookFormProps = {
  entry?: StylebookEntry;
  onSubmit: (preferences: StylebookPreferences) => void;
};

type ChipKey = 'styles' | 'colors' | 'fabrics';

const CHIP_FIELDS: readonly { key: ChipKey; label: string; placeholder: string }[] = [
  { key: 'styles', label: 'Style', placeholder: 'e.g. Kaftan' },
  { key: 'colors', label: 'Colour', placeholder: 'e.g. Emerald green' },
  { key: 'fabrics', label: 'Fabric', placeholder: 'e.g. Ankara' },
];

/** Style preferences for one client: styles, colours, fabrics, fit and special instructions. */
export function StylebookForm({ entry, onSubmit }: StylebookFormProps) {
  const [draft, setDraft] = useState(() => entryToDraft(entry));
  const [pending, setPending] = useState<Record<ChipKey, string>>({
    styles: '',
    colors: '',
    fabrics: '',
  });

  /** Text still in a chip box when Save is tapped counts as added. */
  const submit = () =>
    onSubmit(
      toStylebookPreferences({
        ...draft,
        styles: addChip(draft.styles, pending.styles),
        colors: addChip(draft.colors, pending.colors),
        fabrics: addChip(draft.fabrics, pending.fabrics),
      }),
    );

  return (
    <View className="gap-section">
      {CHIP_FIELDS.map(({ key, label, placeholder }) => (
        <ChipField
          key={key}
          label={label}
          placeholder={placeholder}
          chips={draft[key]}
          text={pending[key]}
          onTextChange={(text) => setPending((p) => ({ ...p, [key]: text }))}
          onChange={(chips) => setDraft((d) => ({ ...d, [key]: chips }))}
        />
      ))}
      <FormField
        label="Fit"
        value={draft.fit}
        onChangeText={(fit) => setDraft((d) => ({ ...d, fit }))}
        placeholder="e.g. Relaxed, slim through the waist"
      />
      <FormField
        label="Special instructions"
        value={draft.instructions}
        onChangeText={(instructions) => setDraft((d) => ({ ...d, instructions }))}
        placeholder="Anything to remember when sewing for this client"
        multiline
      />
      <PillButton label="Save preferences" onPress={submit} />
    </View>
  );
}
