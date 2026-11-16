import { useLocalSearchParams } from 'expo-router';

import { ClientFormPage } from '@/components/pages';

export default function EditClient() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ClientFormPage clientId={id} />;
}
