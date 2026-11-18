import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ConfirmDialog, Icon, PillButton, SectionTitle, Text } from '@/components/ui';

export type ReferenceGalleryProps = {
  images: readonly string[];
  onAdd: () => void;
  onRemove: (uri: string) => void;
};

/** Grid of reference images for one client. Tap an image's X to remove it, after confirming. */
export function ReferenceGallery({ images, onAdd, onRemove }: ReferenceGalleryProps) {
  const [removing, setRemoving] = useState<string | null>(null);

  return (
    <View className="gap-3">
      <SectionTitle title="Reference images" />
      <PillButton
        label="Add images"
        icon="image-outline"
        tone="soft"
        className="self-start"
        onPress={onAdd}
      />
      {images.length === 0 ? (
        <Text tone="muted">No reference images yet.</Text>
      ) : (
        <View className="flex-row flex-wrap gap-2">
          {images.map((uri) => (
            <View key={uri} className="aspect-square w-[31.5%] overflow-hidden rounded-tile">
              <Image
                source={{ uri }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                accessibilityLabel="Reference image"
              />
              <Pressable
                onPress={() => setRemoving(uri)}
                accessibilityRole="button"
                accessibilityLabel="Remove reference image"
                hitSlop={6}
                className="absolute right-1 top-1 size-8 items-center justify-center rounded-full bg-surface shadow-card">
                <Icon name="close" size={18} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
      <ConfirmDialog
        visible={removing !== null}
        title="Remove this image?"
        message="It is removed from this client's stylebook."
        confirmLabel="Remove"
        destructive
        onConfirm={() => {
          if (removing) onRemove(removing);
          setRemoving(null);
        }}
        onCancel={() => setRemoving(null)}
      />
    </View>
  );
}
