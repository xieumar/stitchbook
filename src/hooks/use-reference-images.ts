import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useMemo } from 'react';

import { createId } from '@/lib';

const IMAGE_DIRECTORY = 'reference-images';

/**
 * Picking and storing stylebook reference images. The picker returns a cache file
 * the OS can clear, so each chosen image is copied into the app's documents folder
 * and that stable URI is what gets saved, so images survive restarts.
 */
export function useReferenceImages() {
  return useMemo(
    () => ({
      /** Opens the photo library. Resolves to the stored image URIs; empty if cancelled. */
      pickImages: async (): Promise<string[]> => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsMultipleSelection: true,
          quality: 0.8,
        });
        if (result.canceled) return [];

        const directory = new Directory(Paths.document, IMAGE_DIRECTORY);
        directory.create({ idempotent: true });

        const stored: string[] = [];
        for (const asset of result.assets) {
          const target = new File(directory, `${createId()}.jpg`);
          await new File(asset.uri).copy(target);
          stored.push(target.uri);
        }
        return stored;
      },

      /** Deletes a stored image. Ignores anything outside the app's reference-image folder. */
      discardImage: (uri: string) => {
        if (!uri.includes(IMAGE_DIRECTORY)) return;
        try {
          const file = new File(uri);
          if (file.exists) file.delete();
        } catch {
          // A leftover file is harmless; never block removing the image over it.
        }
      },
    }),
    [],
  );
}
