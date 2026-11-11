import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useCSSVariable } from 'uniwind';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export type IconTone = 'ink' | 'muted' | 'accent' | 'inactive' | 'inverse';

const TONE_VARIABLE: Record<Exclude<IconTone, 'inverse'>, string> = {
  ink: '--color-ink',
  muted: '--muted',
  accent: '--color-accent-text',
  inactive: '--color-nav-inactive',
};

export type IconProps = {
  name: IconName;
  size?: number;
  tone?: IconTone;
};

/** Icon coloured from the design tokens, so it follows the active theme. */
export function Icon({ name, size = 22, tone = 'ink' }: IconProps) {
  const variable = useCSSVariable(tone === 'inverse' ? '--color-ink' : TONE_VARIABLE[tone]);
  const color = tone === 'inverse' ? '#ffffff' : String(variable ?? '#2e1f27');
  return <Ionicons name={name} size={size} color={color} />;
}
