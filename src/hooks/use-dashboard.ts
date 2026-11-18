import { useMemo } from 'react';

import { countMeasuredClients, greeting, heroSummary, type HeroSummary } from '@/lib';
import { useSettingsStore } from '@/store';

import { useAllClients } from './use-clients';
import { useAllRecords } from './use-measurement-records';

export type DashboardData = {
  greeting: string;
  hero: HeroSummary;
};

/** Everything the Home screen shows, derived from the stores and never stored itself. */
export function useDashboard(): DashboardData {
  const clients = useAllClients();
  const records = useAllRecords();
  const ownerName = useSettingsStore((state) => state.ownerName);
  const businessName = useSettingsStore((state) => state.businessName);

  return useMemo(() => {
    const { measured, total } = countMeasuredClients(clients, records);
    return {
      greeting: greeting({ ownerName, businessName }),
      hero: heroSummary(measured, total),
    };
  }, [clients, records, ownerName, businessName]);
}
