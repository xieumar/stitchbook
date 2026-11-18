import { useLocalSearchParams } from 'expo-router';

import { TemplateFormPage } from '@/components/pages';

export default function EditTemplate() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TemplateFormPage templateId={id} />;
}
