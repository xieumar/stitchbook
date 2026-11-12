import { useActivityStore } from './use-activity-store';

/**
 * Records an activity entry. Other stores call this instead of importing each other,
 * so the dependency only ever points at the activity store.
 */
export function logActivity(input: ActivityInput): void {
  useActivityStore.getState().addEntry(input);
}
