import { router } from 'expo-router';

import { HeroCard } from '@/components/layout';
import { HeroButton } from '@/components/ui';

export type DashboardHeroProps = {
  title: string;
  subtitle: string;
};

/** The Home hero card, with the one bold action: add a client. */
export function DashboardHero({ title, subtitle }: DashboardHeroProps) {
  return (
    <HeroCard title={title} subtitle={subtitle}>
      <HeroButton label="Add new client" icon="add" onPress={() => router.push('/client/new')} />
    </HeroCard>
  );
}
