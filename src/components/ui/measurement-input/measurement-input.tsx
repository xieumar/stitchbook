import type { ComponentRef, Ref } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { UNIT_LABEL } from '@/lib';

import { Text } from '../text';

/** The underlying text input instance, for `focus()` when chaining fields. */
export type MeasurementInputRef = ComponentRef<typeof TextInput>;

export type MeasurementInputProps = {
  label: string;
  /** Raw text, so partial entries like "42." survive while typing. */
  value: string;
  onChangeText: (text: string) => void;
  unit: MeasurementUnit;
  /** Fired by the keyboard "next" key; use it to focus the following field. */
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onFocus?: TextInputProps['onFocus'];
  /** React 19 passes `ref` as a normal prop; used for next-field chaining. */
  ref?: Ref<MeasurementInputRef>;
  className?: string;
};

/** Keeps digits and a single decimal point; a comma counts as the point. */
export function sanitizeMeasurementText(text: string): string {
  const cleaned = text.replace(',', '.').replace(/[^0-9.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  return rest.length > 0 ? `${whole}.${rest.join('')}` : whole;
}

/**
 * Large one-handed measurement field: 56px tall, 20px text (never zooms on iOS),
 * decimal keypad and the unit shown as a fixed suffix.
 */
export function MeasurementInput({
  label,
  value,
  onChangeText,
  unit,
  onSubmitEditing,
  returnKeyType = 'next',
  onFocus,
  ref,
  className,
}: MeasurementInputProps) {
  return (
    <View className={className}>
      <Text variant="caption" tone="muted" className="mb-1 ml-1">
        {label}
      </Text>
      <View className="h-[56px] flex-row items-center rounded-input bg-surface px-5 shadow-card">
        <TextInput
          ref={ref}
          value={value}
          onChangeText={(text) => onChangeText(sanitizeMeasurementText(text))}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          returnKeyType={returnKeyType}
          keyboardType="decimal-pad"
          inputMode="decimal"
          selectTextOnFocus
          submitBehavior="submit"
          placeholder="0"
          accessibilityLabel={`${label} in ${UNIT_LABEL[unit]}`}
          className="h-full flex-1 font-outfit-semibold text-[20px] text-ink"
        />
        <Text variant="body" tone="muted" className="ml-2">
          {UNIT_LABEL[unit]}
        </Text>
      </View>
    </View>
  );
}
