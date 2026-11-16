import * as ImagePicker from 'expo-image-picker';
import { Directory, File, Paths } from 'expo-file-system';
import { useMemo } from 'react';

import { createId } from '@/lib';

const PHOTO_DIRECTORY = 'client-photos';

/**
 * Picking and storing client photos. The picker returns a cache file the OS can
 * clear, so a chosen photo is copied into the app's documents folder and that
 * stable URI is what gets saved on the client.
 */
export function useClientPhoto() {
  return useMemo(
    () => ({
      /** Opens the photo library. Resolves to the stored photo's URI, or null if cancelled. */
      pickPhoto: async (): Promise<string | null> => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
        if (result.canceled) return null;

        const directory = new Directory(Paths.document, PHOTO_DIRECTORY);
        directory.create({ idempotent: true });
        const stored = new File(directory, `${createId()}.jpg`);
        await new File(result.assets[0].uri).copy(stored);
        return stored.uri;
      },

      /** Deletes a stored photo. Ignores anything outside the app's photo folder. */
      discardPhoto: (uri: string | undefined) => {
        if (!uri || !uri.includes(PHOTO_DIRECTORY)) return;
        try {
          const file = new File(uri);
          if (file.exists) file.delete();
        } catch {
          // A leftover file is harmless; never block saving over it.
        }
      },
    }),
    [],
  );
}
