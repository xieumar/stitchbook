import type { StateStorage } from 'zustand/middleware';

import { createMemoryStorage, createPersistedStore } from '../persist';

type CounterState = { count: number; increment: () => void };

const makeCounter = (storage: StateStorage, version = 1, migrate?: (p: unknown) => CounterState) =>
  createPersistedStore<CounterState>(
    (set) => ({ count: 0, increment: () => set((s) => ({ count: s.count + 1 })) }),
    { name: 'test:counter', version, storage, migrate },
  );

describe('createPersistedStore', () => {
  it('writes state and version to storage', () => {
    const storage = createMemoryStorage();
    makeCounter(storage).getState().increment();

    const saved = JSON.parse(storage.getItem('test:counter') as string);
    expect(saved.version).toBe(1);
    expect(saved.state.count).toBe(1);
  });

  it('restores saved state when a store is created again', () => {
    const storage = createMemoryStorage();
    const first = makeCounter(storage);
    first.getState().increment();
    first.getState().increment();

    const second = makeCounter(storage);
    expect(second.persist.hasHydrated()).toBe(true);
    expect(second.getState().count).toBe(2);
  });

  it('runs migrate when the saved version is older', () => {
    const storage = createMemoryStorage();
    storage.setItem('test:counter', JSON.stringify({ state: { total: 5 }, version: 0 }));

    const store = makeCounter(storage, 1, (persisted) => {
      const old = persisted as { total: number };
      return { count: old.total * 2 } as CounterState;
    });

    expect(store.getState().count).toBe(10);
  });
});
