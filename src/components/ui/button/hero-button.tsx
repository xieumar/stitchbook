import { Button } from 'heroui-native';

import { Icon, type IconName } from '../icon';
import type { ButtonBaseProps } from './button.types';

export type HeroButtonProps = ButtonBaseProps & {
  label: string;
  icon?: IconName;
};

/**
 * The one hero action per screen: 54px tall, full width, white pill with
 * accent text. Always placed inside the hero card.
 */
export function HeroButton({ label, icon, className, ...props }: HeroButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`h-[54px] w-full rounded-full bg-white ${className ?? ''}`}
      accessibilityLabel={label}
      {...props}>
      {icon ? <Icon name={icon} size={20} tone="accent" /> : null}
      <Button.Label className="font-outfit-semibold text-[16px] text-accent-text">
        {label}
      </Button.Label>
    </Button>
  );
}
