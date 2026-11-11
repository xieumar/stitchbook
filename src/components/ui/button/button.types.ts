import type { Button } from 'heroui-native';
import type { ComponentProps } from 'react';

/** The subset of HeroUI Button props our wrappers expose. */
export type ButtonBaseProps = Pick<
  ComponentProps<typeof Button>,
  'onPress' | 'onLongPress' | 'isDisabled' | 'className' | 'testID' | 'accessibilityHint'
>;
