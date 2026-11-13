import { createId, nowISO } from '@/lib';

import { logActivity } from '../activity';
import { createPersistedStore } from '../persist';

type StylebookState = {
  /** One entry per client, keyed by client id. */
  entries: Record<string, StylebookEntry>;
  setPreferences: (clientId: string, patch: StylebookPreferences) => void;
  addAlterationNote: (clientId: string, text: string) => void;
  addReferenceImage: (clientId: string, uri: string) => void;
  removeReferenceImage: (clientId: string, uri: string) => void;
};

const emptyEntry = (clientId: string): StylebookEntry => ({
  clientId,
  styles: [],
  colors: [],
  fabrics: [],
  alterationNotes: [],
  referenceImages: [],
  updatedAt: nowISO(),
});

export const useStylebookStore = createPersistedStore<StylebookState>(
  (set, get) => {
    const write = (clientId: string, change: (entry: StylebookEntry) => StylebookEntry) =>
      set((state) => ({
        entries: {
          ...state.entries,
          [clientId]: {
            ...change(state.entries[clientId] ?? emptyEntry(clientId)),
            updatedAt: nowISO(),
          },
        },
      }));

    return {
      entries: {},

      setPreferences: (clientId, patch) => {
        write(clientId, (entry) => ({ ...entry, ...patch }));
        logActivity({ type: 'stylebook.updated', message: 'Updated style preferences', clientId });
      },

      addAlterationNote: (clientId, text) => {
        write(clientId, (entry) => ({
          ...entry,
          alterationNotes: [{ id: createId(), text, createdAt: nowISO() }, ...entry.alterationNotes],
        }));
        logActivity({ type: 'stylebook.updated', message: 'Added an alteration note', clientId });
      },

      addReferenceImage: (clientId, uri) => {
        write(clientId, (entry) => ({
          ...entry,
          referenceImages: [...entry.referenceImages, uri],
        }));
        logActivity({ type: 'stylebook.updated', message: 'Added a reference image', clientId });
      },

      removeReferenceImage: (clientId, uri) => {
        if (!get().entries[clientId]) return;
        write(clientId, (entry) => ({
          ...entry,
          referenceImages: entry.referenceImages.filter((u) => u !== uri),
        }));
      },
    };
  },
  { name: 'stitchbook:stylebook', version: 1 },
);
