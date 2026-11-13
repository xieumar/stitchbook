import { View } from 'react-native';

import { InitialAvatar, PillButton, Text } from '@/components/ui';

export type ClientPhotoFieldProps = {
  /** Used for the initials fallback while there is no photo. */
  name: string;
  photoUri?: string;
  onPick: () => void;
  onRemove: () => void;
};

/** Profile photo with an initials fallback, plus add / change / remove actions. */
export function ClientPhotoField({ name, photoUri, onPick, onRemove }: ClientPhotoFieldProps) {
  return (
    <View className="flex-row items-center gap-4 rounded-card bg-surface p-4 shadow-card">
      <InitialAvatar name={name || '?'} size={56} photoUri={photoUri} />
      <View className="flex-1 gap-2">
        <Text variant="caption" tone="muted">
          Photo (optional)
        </Text>
        <View className="flex-row flex-wrap gap-2">
          <PillButton
            label={photoUri ? 'Change photo' : 'Add photo'}
            tone="soft"
            icon="image-outline"
            onPress={onPick}
          />
          {photoUri ? <PillButton label="Remove" tone="soft" onPress={onRemove} /> : null}
        </View>
      </View>
    </View>
  );
}
