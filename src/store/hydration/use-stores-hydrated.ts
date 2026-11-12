import { useSyncExternalStore } from 'react';

import { useActivityStore } from '../activity';
import { useClientsStore } from '../clients';
import { useMeasurementsStore } from '../measurements';
import { useSettingsStore } from '../settings';
import { useStylebookStore } from '../stylebook';
import { useTemplatesStore } from '../templates';

const persistedStores = [
  useClientsStore,
  useTemplatesStore,
  useMeasurementsStore,
  useStylebookStore,
  useActivityStore,
  useSettingsStore,
];

const allHydrated = () => persistedStores.every((store) => store.persist.hasHydrated());

function subscribe(onChange: () => void) {
  const unsubscribes = persistedStores.map((store) => store.persist.onFinishHydration(onChange));
  return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
}

/**
 * True once every persisted store has loaded its saved state. With synchronous
 * storage this is already true on first render; with async storage it flips later.
 */
export function useStoresHydrated(): boolean {
  return useSyncExternalStore(subscribe, allHydrated, allHydrated);
}
