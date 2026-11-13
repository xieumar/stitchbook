import { createId, nowISO } from '@/lib';

import { createPersistedStore } from '../persist';

/** Oldest entries are dropped past this size to keep the persisted payload small. */
const MAX_ENTRIES = 500;

type ActivityState = {
  /** Newest first. */
  entries: ActivityEntry[];
  addEntry: (input: ActivityInput) => void;
  clear: () => void;
};

export const useActivityStore = createPersistedStore<ActivityState>(
  (set) => ({
    entries: [],
    addEntry: (input) =>
      set((state) => ({
        entries: [{ id: createId(), createdAt: nowISO(), ...input }, ...state.entries].slice(
          0,
          MAX_ENTRIES,
        ),
      })),
    clear: () => set({ entries: [] }),
  }),
  { name: 'stitchbook:activity', version: 1 },
);
