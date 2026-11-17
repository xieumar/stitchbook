import { View } from 'react-native';

import { ListCard, ListRow, SectionTitle, Text } from '@/components/ui';
import { formatRecordValue, valueForKey } from '@/lib';

export type RecordValuesProps = {
  record: MeasurementRecord;
};

/** A record's values grouped by the categories of the template it was saved with. */
export function RecordValues({ record }: RecordValuesProps) {
  return (
    <View className="gap-section">
      {record.templateSnapshot.categories.map((category) => (
        <View key={category.id} className="gap-3">
          <SectionTitle title={category.label} />
          <ListCard>
            {category.fields.map((field) => {
              const value = valueForKey(record, field.key);
              return (
                <ListRow
                  key={field.key}
                  title={field.label}
                  trailing={
                    <Text variant="name" tone={value == null ? 'muted' : 'ink'}>
                      {formatRecordValue(value, record.unit)}
                    </Text>
                  }
                />
              );
            })}
          </ListCard>
        </View>
      ))}
    </View>
  );
}
