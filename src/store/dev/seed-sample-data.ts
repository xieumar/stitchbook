import { PREDEFINED_TEMPLATES } from '@/constants';

import { useClientsStore } from '../clients';
import { useMeasurementsStore } from '../measurements';
import { useStylebookStore } from '../stylebook';

const SAMPLE_CLIENTS: ClientInput[] = [
  { name: 'Amara Okafor', phone: '+234 803 555 0142', notes: 'Prefers fitted silhouettes.' },
  { name: 'Folake Adeyemi', phone: '+234 802 555 0187', email: 'folake@example.com' },
  { name: 'Tunde Bello', phone: '+234 805 555 0111' },
];

/** Plausible values (cm) so the sample records look real. */
function sampleValues(template: MeasurementTemplate): MeasurementValue[] {
  return template.categories
    .flatMap((category) => category.fields)
    .map((field, index) => ({
      key: field.key,
      label: field.label,
      value: 30 + ((index * 7) % 70),
    }));
}

/**
 * Fills the stores with a few fake clients, measurements and style preferences.
 * Development only, and a no-op when clients already exist so it never overwrites real data.
 * Returns true if it seeded.
 */
export function seedSampleData(): boolean {
  if (!__DEV__) return false;
  if (Object.keys(useClientsStore.getState().clients).length > 0) return false;

  const { addClient } = useClientsStore.getState();
  const { addRecord } = useMeasurementsStore.getState();
  const { setPreferences, addAlterationNote } = useStylebookStore.getState();

  SAMPLE_CLIENTS.forEach((input, index) => {
    const clientId = addClient(input);
    const template = PREDEFINED_TEMPLATES[index % PREDEFINED_TEMPLATES.length];

    addRecord({
      clientId,
      templateSnapshot: template,
      unit: 'cm',
      values: sampleValues(template),
    });

    setPreferences(clientId, {
      styles: ['Aso ebi', 'Evening gown'],
      colors: ['Emerald', 'Gold'],
      fabrics: ['Lace', 'Silk'],
      fit: 'Fitted',
    });
    addAlterationNote(clientId, 'Take in the waist by 1 cm at the next fitting.');
  });

  return true;
}
