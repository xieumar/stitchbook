import { createId, nowISO } from '@/lib';

import { logActivity } from '../activity';
import { createPersistedStore } from '../persist';

type MeasurementsState = {
  /**
   * Append-only by convention: there is no remove action. New and duplicated
   * measurements are always new records; only an explicit updateRecord edits one.
   */
  records: Record<string, MeasurementRecord>;
  addRecord: (input: MeasurementInput) => string;
  duplicateRecord: (id: string) => string | undefined;
  updateRecord: (
    id: string,
    patch: Partial<Pick<MeasurementRecord, 'unit' | 'measuredAt' | 'notes' | 'values'>>,
  ) => void;
};

export const useMeasurementsStore = createPersistedStore<MeasurementsState>(
  (set, get) => ({
    records: {},

    addRecord: (input) => {
      const id = createId();
      const now = nowISO();
      const { measuredAt, ...rest } = input;
      const record: MeasurementRecord = {
        ...rest,
        id,
        templateId: input.templateSnapshot.id,
        measuredAt: measuredAt ?? now,
        createdAt: now,
        updatedAt: now,
      };
      set((state) => ({ records: { ...state.records, [id]: record } }));
      logActivity({
        type: 'measurement.added',
        message: `Recorded ${record.templateSnapshot.name} measurements`,
        clientId: record.clientId,
        refId: id,
      });
      return id;
    },

    duplicateRecord: (id) => {
      const source = get().records[id];
      if (!source) return undefined;
      const newId = createId();
      const now = nowISO();
      const copy: MeasurementRecord = {
        ...source,
        id: newId,
        measuredAt: now,
        createdAt: now,
        updatedAt: now,
      };
      set((state) => ({ records: { ...state.records, [newId]: copy } }));
      logActivity({
        type: 'measurement.duplicated',
        message: `Duplicated ${source.templateSnapshot.name} measurements`,
        clientId: source.clientId,
        refId: newId,
      });
      return newId;
    },

    updateRecord: (id, patch) => {
      const existing = get().records[id];
      if (!existing) return;
      set((state) => ({
        records: { ...state.records, [id]: { ...existing, ...patch, updatedAt: nowISO() } },
      }));
      logActivity({
        type: 'measurement.updated',
        message: `Edited ${existing.templateSnapshot.name} measurements`,
        clientId: existing.clientId,
        refId: id,
      });
    },
  }),
  { name: 'stitchbook:measurements', version: 1 },
);
