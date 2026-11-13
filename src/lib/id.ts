import { randomUUID } from 'expo-crypto';

/** UUID for new records. */
export function createId(): string {
  return randomUUID();
}

/** Current time as an ISO string, the format every record timestamp uses. */
export function nowISO(): string {
  return new Date().toISOString();
}
