import { Icon, IconBadge, ListCard, ListRow } from '@/components/ui';

export type TemplatePickerProps = {
  templates: readonly MeasurementTemplate[];
  onPick: (template: MeasurementTemplate) => void;
};

function fieldCount(template: MeasurementTemplate): number {
  return template.categories.reduce((total, category) => total + category.fields.length, 0);
}

/** One row per template: pick which set of measurements to record. */
export function TemplatePicker({ templates, onPick }: TemplatePickerProps) {
  return (
    <ListCard>
      {templates.map((template) => (
        <ListRow
          key={template.id}
          title={template.name}
          detail={`${fieldCount(template)} measurements`}
          leading={<IconBadge name="resize-outline" tone="mint" />}
          trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
          onPress={() => onPick(template)}
        />
      ))}
    </ListCard>
  );
}
