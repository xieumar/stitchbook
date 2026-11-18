import { useLocalSearchParams } from 'expo-router';

import { MeasurementDetailPage } from '@/components/pages';

export default function MeasurementDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <MeasurementDetailPage recordId={id} />;
}
