import { useStylebookStore } from '@/store';

/** A client's stylebook entry, or undefined until something has been saved. */
export function useStylebook(clientId: string | undefined): StylebookEntry | undefined {
  return useStylebookStore((state) => (clientId ? state.entries[clientId] : undefined));
}
