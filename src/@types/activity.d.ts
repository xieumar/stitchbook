// Global ambient types for the activity domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

type ActivityType =
  | 'client.added'
  | 'client.updated'
  | 'client.archived'
  | 'client.restored'
  | 'measurement.added'
  | 'measurement.updated'
  | 'measurement.duplicated'
  | 'stylebook.updated'
  | 'template.added'
  | 'template.updated'
  | 'template.removed';

interface ActivityEntry {
  id: string;
  type: ActivityType;
  message: string;
  clientId?: string;
  /** Id of the record the entry is about (measurement, template, ...). */
  refId?: string;
  createdAt: string;
}

type ActivityInput = Pick<ActivityEntry, 'type' | 'message' | 'clientId' | 'refId'>;
