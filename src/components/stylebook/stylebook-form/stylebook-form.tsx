import { useState } from 'react';
import { View } from 'react-native';

import { FormField, PillButton } from '@/components/ui';
import { entryToDraft, toStylebookPreferences } from '@/lib';

import { ChipField } from '../chip-field';

export type StylebookFormProps = {
  entry?: StylebookEntry;
  onSubmit: (preferences: StylebookPreferences) => void;
};

/** Style preferences for one client: styles, colours, fabrics, fit and special instructions. */
export function StylebookForm({ entry, onSubmit }: StylebookFormProps) {
  const [draft, setDraft] = useState(() => entryToDraft(entry));

  return (
    <View className="gap-section">
      <ChipField
        label="Style"
        placeholder="e.g. Kaftan"
        chips={draft.styles}
        onChange={(styles) => setDraft((d) => ({ ...d, styles }))}
      />
      <ChipField
        label="Colour"
        placeholder="e.g. Emerald green"
        chips={draft.colors}
        onChange={(colors) => setDraft((d) => ({ ...d, colors }))}
      />
      <ChipField
        label="Fabric"
        placeholder="e.g. Ankara"
        chips={draft.fabrics}
        onChange={(fabrics) => setDraft((d) => ({ ...d, fabrics }))}
      />
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
      <PillButton
        label="Save preferences"
        onPress={() => onSubmit(toStylebookPreferences(draft))}
      />
    </View>
  );
}
