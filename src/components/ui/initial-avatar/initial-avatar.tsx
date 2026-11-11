import { Image } from 'expo-image';
import { View } from 'react-native';

import { AVATAR_TONES, TILE_BG } from '@/constants';

import { Text } from '../text';

export type InitialAvatarProps = {
  name: string;
  size?: 38 | 46 | 56;
  /** Shown instead of initials once a client photo is added. */
  photoUri?: string | null;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** Stable tone per name so a client keeps the same colour everywhere. */
function toneFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return AVATAR_TONES[sum % AVATAR_TONES.length];
}

export function InitialAvatar({ name, size = 46, photoUri }: InitialAvatarProps) {
  return (
    <View
      accessible
      accessibilityLabel={name}
      style={{ width: size, height: size }}
      className={`items-center justify-center overflow-hidden rounded-full ${TILE_BG[toneFor(name)]}`}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={{ width: size, height: size }} contentFit="cover" />
      ) : (
        <Text variant="initials" style={{ fontSize: Math.round(size * 0.34) }}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}
