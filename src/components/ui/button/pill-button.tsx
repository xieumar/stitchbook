import { Button } from 'heroui-native';

import { Icon, type IconName } from '../icon';
import type { ButtonBaseProps } from './button.types';

export type PillButtonProps = ButtonBaseProps & {
  label: string;
  /**
   * `primary` = filled brand colour, white text. `soft` = quiet tinted pill.
   * `danger` = destructive confirmation (archive, delete).
   */
  tone?: 'primary' | 'soft' | 'danger';
  icon?: IconName;
};

const VARIANT = { primary: 'primary', soft: 'secondary', danger: 'danger' } as const;

/** 44px pill button: the standard action button (e.g. "Measure"). */
export function PillButton({ label, tone = 'primary', icon, className, ...props }: PillButtonProps) {
  const filled = tone !== 'soft';
  return (
    <Button
      variant={VARIANT[tone]}
      className={`h-touch rounded-full px-5 ${className ?? ''}`}
      accessibilityLabel={label}
      {...props}>
      {icon ? <Icon name={icon} size={18} tone={filled ? 'inverse' : 'ink'} /> : null}
      <Button.Label
        className={`font-outfit-semibold text-[15px] ${filled ? 'text-white' : 'text-ink'}`}>
        {label}
      </Button.Label>
    </Button>
  );
}
