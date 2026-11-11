import { Screen, Text } from '@/components';

// Placeholder for the centre "Add" action; becomes the add-client / start-measuring sheet.
export default function Add() {
  return (
    <Screen tabBarSpace={false}>
      <Text variant="screenTitle">Add</Text>
      <Text tone="muted">Add a client or start a measurement. Coming with the clients update.</Text>
    </Screen>
  );
}
