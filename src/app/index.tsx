import { Button } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

import { Text } from '@/components';

// Temporary token check; replaced by the real Home screen later in this PR.
export default function TokenCheck() {
  const [taps, setTaps] = useState(0);

  return (
    <View className="flex-1 justify-center gap-4 bg-ground px-gutter">
      <Text variant="screenTitle">Hello, Folake</Text>
      <Text tone="muted" variant="caption">
        Type scale and Blush tokens
      </Text>
      <View className="rounded-hero bg-hero p-4">
        <Text variant="heroTitle" tone="hero">
          Almost every client is measured
        </Text>
        <Text tone="heroSub">Bust 36 → 36.5 in</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-tile bg-tile-butter p-4">
          <Text variant="bigNumber">48</Text>
          <Text variant="caption">Total clients</Text>
        </View>
        <View className="flex-1 rounded-tile bg-tile-lilac p-4">
          <Text variant="bigNumber">5</Text>
          <Text variant="caption">Not measured yet</Text>
        </View>
      </View>
      <View className="rounded-card bg-surface p-4 shadow-card">
        <Text variant="name">Amaka Okonkwo</Text>
        <Text tone="muted" variant="caption">
          Today, 9:12
        </Text>
      </View>
      <Button onPress={() => setTaps((n) => n + 1)}>
        <Button.Label>Taps: {taps}</Button.Label>
      </Button>
    </View>
  );
}
