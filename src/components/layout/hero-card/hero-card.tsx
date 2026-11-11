import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export type HeroCardProps = {
  title: string;
  subtitle?: string;
  /** Usually a HeroButton. */
  children?: ReactNode;
};

/** The one hero card per screen: pastel pink, 28px radius, no shadow. */
export function HeroCard({ title, subtitle, children }: HeroCardProps) {
  return (
    <View className="gap-1 rounded-hero bg-hero p-5">
      <Text variant="heroTitle" tone="hero">
        {title}
      </Text>
      {subtitle ? <Text tone="heroSub">{subtitle}</Text> : null}
      {children ? <View className="mt-4">{children}</View> : null}
    </View>
  );
}
