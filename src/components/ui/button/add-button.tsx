import { Button } from 'heroui-native';

import { Icon } from '../icon';
import type { ButtonBaseProps } from './button.types';

export type AddButtonProps = ButtonBaseProps & {
  /** Accessible name, e.g. "Add client". */
  label?: string;
  /** Diameter in px. Never below 44 (touch target). Tab bar uses 56. */
  size?: 44 | 52 | 56;
};

/** Round primary button with a plus icon. */
export function AddButton({ label = 'Add', size = 44, className, ...props }: AddButtonProps) {
  return (
    <Button
      isIconOnly
      variant="primary"
      className={`rounded-full ${className ?? ''}`}
      style={{ width: size, height: size }}
      accessibilityLabel={label}
      {...props}>
      <Icon name="add" size={size >= 52 ? 28 : 24} tone="inverse" />
    </Button>
  );
}
