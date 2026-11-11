import { Skeleton as HeroSkeleton } from 'heroui-native';
import { View } from 'react-native';

export type SkeletonProps = {
  className?: string;
};

/** Shimmering placeholder. Size and shape come from className. */
export function Skeleton({ className }: SkeletonProps) {
  return <HeroSkeleton variant="shimmer" className={`rounded-card ${className ?? ''}`} />;
}

/** Placeholder matching a ListRow (avatar + two lines). */
export function ListRowSkeleton() {
  return (
    <View className="min-h-[72px] flex-row items-center gap-3 px-4 py-3">
      <Skeleton className="size-[46px] rounded-full" />
      <View className="flex-1 gap-2">
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-3 w-1/3 rounded-full" />
      </View>
    </View>
  );
}
