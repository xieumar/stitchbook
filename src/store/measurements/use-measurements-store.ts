import { createId, nowISO } from '@/lib';

import { logActivity } from '../activity';
import { createPersistedStore } from '../persist';

type MeasurementsState = {
  /**
   * New and duplicated measurements are always new records; only an explicit
   * updateRecord edits one, and only an explicit deleteRecord removes one.
   */
  records: Record<string, MeasurementRecord>;
  addRecord: (input: MeasurementInput) => string;
  duplicateRecord: (id: string) => string | undefined;
  deleteRecord: (id: string) => void;
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

    deleteRecord: (id) => {
      const existing = get().records[id];
      if (!existing) return;
      set((state) => {
        const { [id]: _removed, ...records } = state.records;
        return { records };
      });
      logActivity({
        type: 'measurement.deleted',
        message: `Deleted ${existing.templateSnapshot.name} measurements`,
        clientId: existing.clientId,
      });
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
