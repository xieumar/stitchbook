import { useLocalSearchParams } from 'expo-router';

import { StylebookFormPage } from '@/components/pages';

export default function EditStylebook() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <StylebookFormPage clientId={id} />;
}
