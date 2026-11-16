import { useMemo } from 'react';

import { useActivityStore } from '@/store';

/** Activity entries about one client, newest first. */
export function useClientActivity(clientId: string | undefined): ActivityEntry[] {
  const entries = useActivityStore((state) => state.entries);
  return useMemo(
    () => (clientId ? entries.filter((entry) => entry.clientId === clientId) : []),
    [entries, clientId],
  );
}
