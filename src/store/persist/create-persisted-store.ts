import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

import { defaultStorage } from './storage';

export type PersistedStoreOptions<T, P = T> = {
  /** Unique storage key, e.g. `stitchbook:clients`. */
  name: string;
  /** Bump when the persisted shape changes; pair with `migrate`. */
  version: number;
  /** Upgrades state saved under an older version to the current shape. */
  migrate?: (persisted: unknown, fromVersion: number) => P | Promise<P>;
  /** Picks the slice to save. Defaults to the whole state (actions are dropped by JSON). */
  partialize?: (state: T) => P;
  /** Override the backing storage. Defaults to the shared app storage. */
  storage?: StateStorage;
};

/**
 * Creates a zustand store that persists to storage with versioned migrations.
 * Every domain store (clients, templates, ...) is built through this factory.
 */
export function createPersistedStore<T, P = T>(
  initializer: StateCreator<T, [['zustand/persist', unknown]], []>,
  { name, version, migrate, partialize, storage = defaultStorage }: PersistedStoreOptions<T, P>,
) {
  return create<T>()(
    persist(initializer, {
      name,
      version,
      storage: createJSONStorage(() => storage),
      migrate: migrate as ((persisted: unknown, fromVersion: number) => T | Promise<T>) | undefined,
      partialize: partialize as ((state: T) => T) | undefined,
    }),
  );
}
