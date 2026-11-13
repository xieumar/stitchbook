import { createPersistedStore } from '../persist';

type SettingsState = AppSettings & {
  updateSettings: (patch: Partial<AppSettings>) => void;
};

export const DEFAULT_SETTINGS: AppSettings = {
  businessName: '',
  defaultUnit: 'cm',
  palette: 'blush',
};

export const useSettingsStore = createPersistedStore<SettingsState>(
  (set) => ({
    ...DEFAULT_SETTINGS,
    updateSettings: (patch) => set(patch),
  }),
  { name: 'stitchbook:settings', version: 1 },
);
