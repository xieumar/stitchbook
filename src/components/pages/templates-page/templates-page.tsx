import { router } from 'expo-router';

import { Screen, ScreenHeader } from '@/components/layout';
import { TemplateList } from '@/components/templates';
import { PillButton, Text } from '@/components/ui';
import { useAllTemplates } from '@/hooks';

/** Every measurement template: built-in ones first, then the tailor's own. */
export function TemplatesPage() {
  const templates = useAllTemplates();

  return (
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Templates" />
      <Text tone="muted">
        Templates decide which measurements you record. Built-in templates are read-only; duplicate
        one to customise it.
      </Text>
      <PillButton label="New template" icon="add" onPress={() => router.push('/templates/new')} />
      <TemplateList
        templates={templates}
        onPick={(template) =>
          router.push({ pathname: '/templates/[id]', params: { id: template.id } })
        }
      />
    </Screen>
  );
}
