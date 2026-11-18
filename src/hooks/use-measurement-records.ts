import { useMemo } from 'react';

import { sortRecordsNewestFirst } from '@/lib';
import { useMeasurementsStore } from '@/store';

/** Every record, newest first. */
export function useAllRecords(): MeasurementRecord[] {
  const records = useMeasurementsStore((state) => state.records);
  return useMemo(() => sortRecordsNewestFirst(Object.values(records)), [records]);
}

/** One client's records, newest first. */
export function useClientRecords(clientId: string | undefined): MeasurementRecord[] {
  const all = useAllRecords();
  return useMemo(() => all.filter((record) => record.clientId === clientId), [all, clientId]);
}

/** One record by id, or undefined when it does not exist. */
export function useRecord(id: string | undefined): MeasurementRecord | undefined {
  return useMeasurementsStore((state) => (id ? state.records[id] : undefined));
}
