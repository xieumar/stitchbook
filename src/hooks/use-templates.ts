import { useMemo } from 'react';

import { findTemplate, selectAllTemplates, useTemplatesStore } from '@/store';

/** Predefined templates first, then custom ones by name. */
export function useAllTemplates(): MeasurementTemplate[] {
  const custom = useTemplatesStore((state) => state.custom);
  return useMemo(() => selectAllTemplates({ custom }), [custom]);
}

/** One template by id (predefined or custom), or undefined when it does not exist. */
export function useTemplate(id: string | undefined): MeasurementTemplate | undefined {
  const custom = useTemplatesStore((state) => state.custom);
  return useMemo(() => (id ? findTemplate({ custom }, id) : undefined), [custom, id]);
}
