import { DashboardHero, DashboardSearch, DashboardStats } from '@/components/dashboard';
import { Screen } from '@/components/layout';
import { Text } from '@/components/ui';
import { useDashboard } from '@/hooks';

/** The Home tab: greeting, hero card, quick search and stat tiles. More sections follow. */
export function HomePage() {
  const { greeting, hero, stats } = useDashboard();

  return (
    <Screen>
      <Text variant="screenTitle">{greeting}</Text>
      <DashboardHero title={hero.title} subtitle={hero.subtitle} />
      <DashboardSearch />
      <DashboardStats stats={stats} />
    </Screen>
  );
}
