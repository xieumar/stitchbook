import { createId, nowISO } from '@/lib';

import { logActivity } from '../activity';
import { createPersistedStore } from '../persist';

type ClientsState = {
  clients: Record<string, ClientRecord>;
  addClient: (input: ClientInput) => string;
  updateClient: (id: string, patch: Partial<ClientInput>) => void;
  archiveClient: (id: string) => void;
  restoreClient: (id: string) => void;
};

export const useClientsStore = createPersistedStore<ClientsState>(
  (set, get) => ({
    clients: {},

    addClient: (input) => {
      const id = createId();
      const now = nowISO();
      set((state) => ({
        clients: { ...state.clients, [id]: { ...input, id, createdAt: now, updatedAt: now } },
      }));
      logActivity({ type: 'client.added', message: `Added ${input.name}`, clientId: id });
      return id;
    },

    updateClient: (id, patch) => {
      const existing = get().clients[id];
      if (!existing) return;
      set((state) => ({
        clients: { ...state.clients, [id]: { ...existing, ...patch, updatedAt: nowISO() } },
      }));
      logActivity({ type: 'client.updated', message: `Updated ${existing.name}`, clientId: id });
    },

    archiveClient: (id) => {
      const existing = get().clients[id];
      if (!existing || existing.archivedAt) return;
      const now = nowISO();
      set((state) => ({
        clients: { ...state.clients, [id]: { ...existing, archivedAt: now, updatedAt: now } },
      }));
      logActivity({ type: 'client.archived', message: `Archived ${existing.name}`, clientId: id });
    },

    restoreClient: (id) => {
      const existing = get().clients[id];
      if (!existing || !existing.archivedAt) return;
      set((state) => ({
        clients: {
          ...state.clients,
          [id]: { ...existing, archivedAt: undefined, updatedAt: nowISO() },
        },
      }));
      logActivity({ type: 'client.restored', message: `Restored ${existing.name}`, clientId: id });
    },
  }),
  { name: 'stitchbook:clients', version: 1 },
);
