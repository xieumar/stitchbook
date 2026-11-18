import { Icon, IconBadge, ListCard, ListRow } from '@/components/ui';

export type TemplateListProps = {
  templates: readonly MeasurementTemplate[];
  onPick: (template: MeasurementTemplate) => void;
};

/** Count of measurement fields across every category of a template. */
export function templateFieldCount(template: MeasurementTemplate): number {
  return template.categories.reduce((total, category) => total + category.fields.length, 0);
}

/** One row per template, marked as built-in or custom. */
export function TemplateList({ templates, onPick }: TemplateListProps) {
  return (
    <ListCard>
      {templates.map((template) => (
        <ListRow
          key={template.id}
          title={template.name}
          detail={`${template.kind === 'predefined' ? 'Built-in' : 'Custom'} · ${templateFieldCount(template)} measurements`}
          leading={<IconBadge name="resize-outline" tone="mint" />}
          trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
          onPress={() => onPick(template)}
        />
      ))}
    </ListCard>
  );
}
