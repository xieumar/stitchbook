import { useLocalSearchParams } from 'expo-router';

import { TemplateDetailPage } from '@/components/pages';

export default function TemplateDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TemplateDetailPage templateId={id} />;
}
