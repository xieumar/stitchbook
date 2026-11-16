import { View } from 'react-native';

import { TILE_BG, type TileTone } from '@/constants';

import { Icon, type IconName } from '../icon';

export type IconBadgeProps = {
  name: IconName;
  tone?: TileTone;
  size?: 38 | 46;
};

/** Round pastel badge with an icon, used as a list row's leading element. */
export function IconBadge({ name, tone = 'lilac', size = 46 }: IconBadgeProps) {
  return (
    <View
      style={{ width: size, height: size }}
      className={`items-center justify-center rounded-full ${TILE_BG[tone]}`}>
      <Icon name={name} size={Math.round(size * 0.46)} />
    </View>
  );
}
