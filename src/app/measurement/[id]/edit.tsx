import { useLocalSearchParams } from 'expo-router';

import { MeasurementEditPage } from '@/components/pages';

export default function EditMeasurement() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <MeasurementEditPage recordId={id} />;
}
