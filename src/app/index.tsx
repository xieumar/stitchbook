import { Button } from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

// Temporary smoke test for PR 1: Uniwind classes, HeroUI Button, Outfit.
// MMKV is checked separately once a development build exists (not in Expo Go).
// Replaced by the real Home screen in the design-system PR.
export default function SmokeTest() {
  const [taps, setTaps] = useState(0);

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-[#FFF3F5] px-5">
      <Text style={{ fontFamily: 'Outfit_600SemiBold' }} className="text-[23px] text-[#2E1F27]">
        Stitchbook
      </Text>
      <Button onPress={() => setTaps((n) => n + 1)}>
        <Button.Label>Taps: {taps}</Button.Label>
      </Button>
    </View>
  );
}
