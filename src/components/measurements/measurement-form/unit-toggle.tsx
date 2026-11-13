import { Tabs } from 'heroui-native';

import { UNIT_LABEL } from '@/lib';

const UNITS: readonly MeasurementUnit[] = ['cm', 'in'];

export type UnitToggleProps = {
  value: MeasurementUnit;
  onChange: (unit: MeasurementUnit) => void;
};

/** Pill switch for centimetres / inches, built on HeroUI Tabs (no content panels). */
export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as MeasurementUnit)}
      className="self-start">
      <Tabs.List className="h-touch">
        <Tabs.Indicator />
        {UNITS.map((unit) => (
          <Tabs.Trigger
            key={unit}
            value={unit}
            className="min-w-[64px]"
            accessibilityLabel={unit === 'cm' ? 'Centimetres' : 'Inches'}>
            <Tabs.Label className="font-outfit-semibold text-[16px]">{UNIT_LABEL[unit]}</Tabs.Label>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
