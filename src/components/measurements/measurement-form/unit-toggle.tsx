import { SegmentedTabs, type SegmentedTabsOption } from '@/components/ui';
import { UNIT_LABEL } from '@/lib';

const OPTIONS: readonly SegmentedTabsOption<MeasurementUnit>[] = [
  { value: 'cm', label: UNIT_LABEL.cm, accessibilityLabel: 'Centimetres' },
  { value: 'in', label: UNIT_LABEL.in, accessibilityLabel: 'Inches' },
];

export type UnitToggleProps = {
  value: MeasurementUnit;
  onChange: (unit: MeasurementUnit) => void;
};

/** Centimetres / inches switch. */
export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return <SegmentedTabs options={OPTIONS} value={value} onChange={onChange} className="self-start" />;
}
