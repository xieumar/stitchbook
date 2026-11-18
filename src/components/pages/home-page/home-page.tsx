import { DashboardHero } from '@/components/dashboard';
import { Screen } from '@/components/layout';
import { Text } from '@/components/ui';
import { useDashboard } from '@/hooks';

/** The Home tab: a greeting and the hero card. More sections arrive in the next commits. */
export function HomePage() {
  const { greeting, hero } = useDashboard();

  return (
    <Screen>
      <Text variant="screenTitle">{greeting}</Text>
      <DashboardHero title={hero.title} subtitle={hero.subtitle} />
    </Screen>
  );
}
