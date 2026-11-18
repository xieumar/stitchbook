import { Tabs } from 'heroui-native';

export type SegmentedTabsOption<T extends string> = {
  value: T;
  label: string;
  accessibilityLabel?: string;
};

export type SegmentedTabsProps<T extends string> = {
  options: readonly SegmentedTabsOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Horizontally scrollable list, for many or long labels. */
  scrollable?: boolean;
  /** Smaller labels, so several tabs fit the width without scrolling. */
  compact?: boolean;
  /** Stretch to the full width, with every tab the same width (profile tabs). */
  fullWidth?: boolean;
  className?: string;
};

/**
 * Pill switch built on HeroUI Tabs, with no content panels: the parent decides
 * what to show for the selected value (unit toggle, status filter, profile tabs).
 */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  scrollable = false,
  compact = false,
  fullWidth = false,
  className,
}: SegmentedTabsProps<T>) {
  const triggers = options.map((option) => (
    <Tabs.Trigger
      key={option.value}
      value={option.value}
      className={fullWidth && !scrollable ? 'flex-1' : undefined}
      accessibilityLabel={option.accessibilityLabel ?? option.label}>
      <Tabs.Label className={`font-outfit-semibold ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
        {option.label}
      </Tabs.Label>
    </Tabs.Trigger>
  ));

  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as T)} className={className}>
      <Tabs.List className={`min-h-touch ${fullWidth ? 'self-stretch' : ''}`}>
        {scrollable ? (
          <Tabs.ScrollView>
            <Tabs.Indicator />
            {triggers}
          </Tabs.ScrollView>
        ) : (
          <>
            <Tabs.Indicator />
            {triggers}
          </>
        )}
      </Tabs.List>
    </Tabs>
  );
}
