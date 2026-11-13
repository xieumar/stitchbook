const f = (key: string, label: string): TemplateField => ({ key, label });

/** Seeded, read-only templates. Never persisted; merged with custom ones by the templates store. */
export const PREDEFINED_TEMPLATES: readonly MeasurementTemplate[] = [
  {
    id: 'predefined-womens',
    name: "Women's standard",
    kind: 'predefined',
    categories: [
      {
        id: 'upper',
        label: 'Upper body',
        fields: [
          f('shoulder', 'Shoulder'),
          f('bust', 'Bust'),
          f('underbust', 'Underbust'),
          f('waist', 'Waist'),
          f('sleeve-length', 'Sleeve length'),
          f('bicep', 'Bicep'),
          f('top-length', 'Top length'),
        ],
      },
      {
        id: 'lower',
        label: 'Lower body',
        fields: [
          f('hip', 'Hip'),
          f('thigh', 'Thigh'),
          f('inseam', 'Inseam'),
          f('skirt-length', 'Skirt length'),
          f('trouser-length', 'Trouser length'),
        ],
      },
    ],
  },
  {
    id: 'predefined-mens',
    name: "Men's standard",
    kind: 'predefined',
    categories: [
      {
        id: 'upper',
        label: 'Upper body',
        fields: [
          f('neck', 'Neck'),
          f('shoulder', 'Shoulder'),
          f('chest', 'Chest'),
          f('waist', 'Waist'),
          f('sleeve-length', 'Sleeve length'),
          f('bicep', 'Bicep'),
          f('shirt-length', 'Shirt length'),
        ],
      },
      {
        id: 'lower',
        label: 'Lower body',
        fields: [
          f('hip', 'Hip'),
          f('thigh', 'Thigh'),
          f('inseam', 'Inseam'),
          f('outseam', 'Outseam'),
          f('trouser-length', 'Trouser length'),
        ],
      },
    ],
  },
];
