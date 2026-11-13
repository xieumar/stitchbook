// Global ambient types for the client domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

interface ClientRecord {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  photoUri?: string;
  /** Set when archived; clients are never hard-deleted from the UI. */
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
}

type ClientInput = Pick<ClientRecord, 'name' | 'phone' | 'email' | 'notes' | 'photoUri'>;
