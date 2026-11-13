import { InputGroup, Label, TextField } from 'heroui-native';
import type { ComponentRef, Ref } from 'react';
import type { TextInputProps } from 'react-native';

import { UNIT_LABEL } from '@/lib';

import { Text } from '../text';

/** The underlying text input instance, for `focus()` when chaining fields. */
export type MeasurementInputRef = ComponentRef<typeof InputGroup.Input>;

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
 * decimal keypad and the unit shown as a fixed suffix. Built on HeroUI TextField.
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
    <TextField className={className}>
      <Label className="mb-1 ml-1">
        <Label.Text className="font-outfit text-[13px] text-muted">{label}</Label.Text>
      </Label>
      <InputGroup>
        <InputGroup.Input
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
          className="h-[56px] rounded-input bg-surface font-outfit-semibold text-[20px] shadow-card"
        />
        <InputGroup.Suffix isDecorative>
          <Text variant="body" tone="muted" className="mr-5">
            {UNIT_LABEL[unit]}
          </Text>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
