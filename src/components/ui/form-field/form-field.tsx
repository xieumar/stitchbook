import { FieldError, Input, Label, TextField } from 'heroui-native';
import type { ComponentRef, Ref } from 'react';
import type { TextInputProps } from 'react-native';

/** The underlying text input instance, for `focus()` when chaining fields. */
export type FormFieldRef = ComponentRef<typeof Input>;

export type FormFieldProps = Pick<
  TextInputProps,
  | 'placeholder'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'textContentType'
  | 'returnKeyType'
  | 'onSubmitEditing'
  | 'multiline'
  | 'maxLength'
> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  /** Shown under the field in the error colour; also marks the field invalid. */
  error?: string;
  isRequired?: boolean;
  ref?: Ref<FormFieldRef>;
  className?: string;
};

/** Labelled text field with inline validation message. 16px text so iOS never zooms. */
export function FormField({
  label,
  value,
  onChangeText,
  error,
  isRequired,
  multiline,
  ref,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <TextField isRequired={isRequired} isInvalid={!!error} className={className}>
      <Label className="mb-1 ml-1">
        <Label.Text className="font-outfit text-[13px] text-muted">{label}</Label.Text>
      </Label>
      <Input
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        accessibilityLabel={label}
        className={`rounded-input bg-surface font-outfit text-[16px] shadow-card ${
          multiline ? 'min-h-[104px] py-3' : 'h-[52px]'
        }`}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...inputProps}
      />
      <FieldError>{error}</FieldError>
    </TextField>
  );
}
