import { useMemo } from 'react';

import {
  countMeasuredClients,
  dashboardStats,
  greeting,
  heroSummary,
  type DashboardStats,
  type HeroSummary,
} from '@/lib';
import { useSettingsStore } from '@/store';

import { useAllClients } from './use-clients';
import { useAllRecords } from './use-measurement-records';

export type DashboardData = {
  greeting: string;
  hero: HeroSummary;
  stats: DashboardStats;
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
      stats: dashboardStats(clients, records),
    };
  }, [clients, records, ownerName, businessName]);
}
