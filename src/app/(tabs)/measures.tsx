import { EmptyState, Screen, Text } from '@/components';

export default function Measures() {
  return (
    <Screen>
      <Text variant="screenTitle">Measures</Text>
      <EmptyState
        icon="resize-outline"
        tone="mint"
        title="No measurements yet"
        message="Records you save for your clients will appear here."
      />
    </Screen>
  );
}
