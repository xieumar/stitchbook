import { PREDEFINED_TEMPLATES } from '@/constants';
import { createId, nowISO } from '@/lib';

import { logActivity } from '../activity';
import { createPersistedStore } from '../persist';

type TemplatesState = {
  /** Custom templates only. Predefined ones come from PREDEFINED_TEMPLATES. */
  custom: Record<string, MeasurementTemplate>;
  addTemplate: (input: TemplateInput) => string;
  updateTemplate: (id: string, patch: Partial<TemplateInput>) => void;
  removeTemplate: (id: string) => void;
};

export const useTemplatesStore = createPersistedStore<TemplatesState>(
  (set, get) => ({
    custom: {},

    addTemplate: (input) => {
      const id = createId();
      const now = nowISO();
      set((state) => ({
        custom: {
          ...state.custom,
          [id]: { ...input, id, kind: 'custom', createdAt: now, updatedAt: now },
        },
      }));
      logActivity({ type: 'template.added', message: `Created template ${input.name}`, refId: id });
      return id;
    },

    // Predefined templates are read-only, so only ids in `custom` can change.
    updateTemplate: (id, patch) => {
      const existing = get().custom[id];
      if (!existing) return;
      set((state) => ({
        custom: { ...state.custom, [id]: { ...existing, ...patch, updatedAt: nowISO() } },
      }));
      logActivity({
        type: 'template.updated',
        message: `Updated template ${existing.name}`,
        refId: id,
      });
    },

    removeTemplate: (id) => {
      const existing = get().custom[id];
      if (!existing) return;
      set((state) => {
        const { [id]: _removed, ...rest } = state.custom;
        return { custom: rest };
      });
      logActivity({
        type: 'template.removed',
        message: `Removed template ${existing.name}`,
        refId: id,
      });
    },
  }),
  { name: 'stitchbook:templates', version: 1 },
);

/** Predefined templates first, then custom ones by name. */
export function selectAllTemplates(state: { custom: Record<string, MeasurementTemplate> }) {
  const custom = Object.values(state.custom).sort((a, b) => a.name.localeCompare(b.name));
  return [...PREDEFINED_TEMPLATES, ...custom];
}

/** Finds a template by id across predefined and custom. */
export function findTemplate(
  state: { custom: Record<string, MeasurementTemplate> },
  id: string,
): MeasurementTemplate | undefined {
  return PREDEFINED_TEMPLATES.find((t) => t.id === id) ?? state.custom[id];
}
