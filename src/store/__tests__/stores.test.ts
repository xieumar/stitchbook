import { PREDEFINED_TEMPLATES } from '@/constants';

import { useActivityStore } from '../activity';
import { useClientsStore } from '../clients';
import { seedSampleData } from '../dev';
import { useMeasurementsStore } from '../measurements';
import { useStylebookStore } from '../stylebook';
import { selectAllTemplates, useTemplatesStore } from '../templates';

beforeEach(() => {
  useClientsStore.setState({ clients: {} });
  useMeasurementsStore.setState({ records: {} });
  useStylebookStore.setState({ entries: {} });
  useTemplatesStore.setState({ custom: {} });
  useActivityStore.setState({ entries: [] });
});

const template = PREDEFINED_TEMPLATES[0];
const values = [{ key: 'waist', label: 'Waist', value: 70 }];

describe('templates', () => {
  it('lists predefined templates and adds custom ones after them', () => {
    const id = useTemplatesStore.getState().addTemplate({
      name: 'Bridal',
      categories: [{ id: 'c', label: 'Bodice', fields: [{ key: 'bust', label: 'Bust' }] }],
    });

    const all = selectAllTemplates(useTemplatesStore.getState());
    expect(all.slice(0, PREDEFINED_TEMPLATES.length)).toEqual(PREDEFINED_TEMPLATES);
    expect(all.at(-1)?.id).toBe(id);
  });

  it('cannot edit or remove a predefined template', () => {
    const { updateTemplate, removeTemplate } = useTemplatesStore.getState();
    updateTemplate(template.id, { name: 'Hacked' });
    removeTemplate(template.id);

    expect(useTemplatesStore.getState().custom).toEqual({});
    expect(selectAllTemplates(useTemplatesStore.getState())[0].name).toBe(template.name);
  });
});

describe('measurements history', () => {
  it('adds each measurement as a separate record', () => {
    const { addRecord } = useMeasurementsStore.getState();
    const a = addRecord({ clientId: 'c1', templateSnapshot: template, unit: 'cm', values });
    const b = addRecord({ clientId: 'c1', templateSnapshot: template, unit: 'cm', values });

    expect(a).not.toBe(b);
    expect(Object.keys(useMeasurementsStore.getState().records)).toHaveLength(2);
  });

  it('duplicates into a new record and leaves the original untouched', () => {
    const { addRecord, duplicateRecord } = useMeasurementsStore.getState();
    const original = addRecord({ clientId: 'c1', templateSnapshot: template, unit: 'cm', values });
    const before = { ...useMeasurementsStore.getState().records[original] };

    const copyId = duplicateRecord(original);

    expect(copyId).toBeDefined();
    expect(copyId).not.toBe(original);
    expect(useMeasurementsStore.getState().records[original]).toEqual(before);
  });

  it('exposes no way to remove a record', () => {
    expect(useMeasurementsStore.getState()).not.toHaveProperty('removeRecord');
    expect(useMeasurementsStore.getState()).not.toHaveProperty('deleteRecord');
  });

  it('keeps the saved template snapshot when a custom template is edited later', () => {
    const templateId = useTemplatesStore.getState().addTemplate({
      name: 'Custom',
      categories: [{ id: 'c', label: 'Body', fields: [{ key: 'waist', label: 'Waist' }] }],
    });
    const custom = useTemplatesStore.getState().custom[templateId];

    const recordId = useMeasurementsStore
      .getState()
      .addRecord({ clientId: 'c1', templateSnapshot: custom, unit: 'cm', values });

    useTemplatesStore.getState().updateTemplate(templateId, { name: 'Renamed', categories: [] });

    const record = useMeasurementsStore.getState().records[recordId];
    expect(record.templateSnapshot.name).toBe('Custom');
    expect(record.templateSnapshot.categories).toHaveLength(1);
  });
});

describe('activity logging', () => {
  it('records client changes newest first', () => {
    const id = useClientsStore.getState().addClient({ name: 'Ada' });
    useClientsStore.getState().archiveClient(id);

    const types = useActivityStore.getState().entries.map((e) => e.type);
    expect(types).toEqual(['client.archived', 'client.added']);
  });

  it('archive and restore keep the client', () => {
    const id = useClientsStore.getState().addClient({ name: 'Ada' });
    useClientsStore.getState().archiveClient(id);
    expect(useClientsStore.getState().clients[id].archivedAt).toBeDefined();

    useClientsStore.getState().restoreClient(id);
    expect(useClientsStore.getState().clients[id].archivedAt).toBeUndefined();
  });
});

describe('seedSampleData', () => {
  it('fills the stores once and does not overwrite existing clients', () => {
    expect(seedSampleData()).toBe(true);
    const count = Object.keys(useClientsStore.getState().clients).length;
    expect(count).toBeGreaterThan(0);
    expect(Object.keys(useMeasurementsStore.getState().records)).toHaveLength(count);

    expect(seedSampleData()).toBe(false);
    expect(Object.keys(useClientsStore.getState().clients)).toHaveLength(count);
  });
});
