import { useLocalSearchParams } from 'expo-router';

import { MeasurementFormPage } from '@/components/pages';

export default function NewMeasurement() {
  const { clientId, templateId } = useLocalSearchParams<{ clientId?: string; templateId?: string }>();
  return <MeasurementFormPage clientId={clientId} templateId={templateId} />;
}
