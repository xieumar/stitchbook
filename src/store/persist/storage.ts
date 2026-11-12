import type { StateStorage } from 'zustand/middleware';

/**
 * In-memory storage. Used until the MMKV adapter lands with the first dev build,
 * so state lives only for the current app session.
 */
export function createMemoryStorage(): StateStorage {
  const data = new Map<string, string>();
  return {
    getItem: (name) => data.get(name) ?? null,
    setItem: (name, value) => {
      data.set(name, value);
    },
    removeItem: (name) => {
      data.delete(name);
    },
  };
}

/** Shared default for every persisted store. Swap this for the MMKV adapter later. */
export const defaultStorage: StateStorage = createMemoryStorage();
