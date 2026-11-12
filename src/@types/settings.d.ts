// Global ambient types for the settings domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

type PaletteName = 'blush';

interface AppSettings {
  businessName: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  logoUri?: string;
  defaultUnit: MeasurementUnit;
  palette: PaletteName;
}
