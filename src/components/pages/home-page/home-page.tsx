import { DashboardHero, DashboardStats } from '@/components/dashboard';
import { Screen } from '@/components/layout';
import { Text } from '@/components/ui';
import { useDashboard } from '@/hooks';

/** The Home tab: greeting, hero card and stat tiles. More sections arrive in the next commits. */
export function HomePage() {
  const { greeting, hero, stats } = useDashboard();

  return (
    <Screen>
      <Text variant="screenTitle">{greeting}</Text>
      <DashboardHero title={hero.title} subtitle={hero.subtitle} />
      <DashboardStats stats={stats} />
    </Screen>
  );
}
