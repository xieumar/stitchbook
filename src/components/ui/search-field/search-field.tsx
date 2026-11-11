import { SearchField as HeroSearchField } from 'heroui-native';

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/** 52px pill search field: white, no border, soft shadow, 16px text (no iOS zoom). */
export function SearchField({
  value,
  onChange,
  placeholder = 'Search by name or phone',
  className,
}: SearchFieldProps) {
  return (
    <HeroSearchField value={value} onChange={onChange} className={className}>
      <HeroSearchField.Group>
        <HeroSearchField.SearchIcon />
        <HeroSearchField.Input
          placeholder={placeholder}
          accessibilityLabel={placeholder}
          className="h-[52px] rounded-input bg-surface font-outfit text-[16px] shadow-card"
        />
        <HeroSearchField.ClearButton />
      </HeroSearchField.Group>
    </HeroSearchField>
  );
}
