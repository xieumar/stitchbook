import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

/**
 * In-memory storage: state lives only for the current session. Used by tests that
 * need an isolated, synchronous store.
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

/**
 * Shared default for every persisted store: saved on the device, so data survives
 * restarts and works in Expo Go. It is asynchronous, so stores hydrate shortly after
 * launch; the root layout waits for that (see useStoresHydrated). Swap this for an
 * MMKV adapter once the app moves to a development build.
 */
export const defaultStorage: StateStorage = {
  getItem: (name) => AsyncStorage.getItem(name),
  setItem: (name, value) => AsyncStorage.setItem(name, value),
  removeItem: (name) => AsyncStorage.removeItem(name),
};
