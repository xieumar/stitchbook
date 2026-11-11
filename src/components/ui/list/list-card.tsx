import { Children, Fragment, type ReactNode } from 'react';
import { View } from 'react-native';

export type ListCardProps = {
  children: ReactNode;
};

/** One white card holding several rows, separated by hairline dividers. */
export function ListCard({ children }: ListCardProps) {
  const rows = Children.toArray(children);
  return (
    <View className="overflow-hidden rounded-card bg-surface shadow-card">
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 ? <View className="ml-[70px] h-px bg-hairline" /> : null}
          {row}
        </Fragment>
      ))}
    </View>
  );
}
