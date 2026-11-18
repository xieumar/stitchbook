import { router } from 'expo-router';
import { View } from 'react-native';

import { StatTile } from '@/components/ui';
import type { ClientListFilter, DashboardStats as DashboardStatsData } from '@/lib';

export type DashboardStatsProps = {
  stats: DashboardStatsData;
};

const openClients = (filter: ClientListFilter) =>
  router.push({ pathname: '/clients', params: { filter } });

/** Four pastel tiles. Each one opens the client list filtered to the number it shows. */
export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <View className="gap-3">
      <View className="flex-row gap-3">
        <StatTile
          icon="people-outline"
          value={stats.total}
          label="Total clients"
          tone="butter"
          onPress={() => openClients('all')}
        />
        <StatTile
          icon="time-outline"
          value={stats.notMeasured}
          label="Not measured yet"
          tone="lilac"
          onPress={() => openClients('not-measured')}
        />
      </View>
      <View className="flex-row gap-3">
        <StatTile
          icon="person-add-outline"
          value={stats.addedThisWeek}
          label="Added this week"
          tone="mint"
          onPress={() => openClients('added-this-week')}
        />
        <StatTile
          icon="refresh-outline"
          value={stats.updatedThisWeek}
          label="Updated this week"
          tone="sky"
          onPress={() => openClients('updated-this-week')}
        />
      </View>
    </View>
  );
}
