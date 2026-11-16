import { useLocalSearchParams } from 'expo-router';

import { ClientProfilePage } from '@/components/pages';

export default function ClientProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ClientProfilePage clientId={id} />;
}
