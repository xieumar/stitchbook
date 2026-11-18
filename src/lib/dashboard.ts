/** Clients who are not archived: the ones the dashboard counts. */
export function activeClients(clients: readonly ClientRecord[]): ClientRecord[] {
  return clients.filter((client) => !client.archivedAt);
}

/** Active clients with at least one saved measurement record. */
export function countMeasuredClients(
  clients: readonly ClientRecord[],
  records: readonly MeasurementRecord[],
): { measured: number; total: number } {
  const active = activeClients(clients);
  const withRecords = new Set(records.map((record) => record.clientId));
  return { measured: active.filter((client) => withRecords.has(client.id)).length, total: active.length };
}

export type HeroSummary = { title: string; subtitle: string };

const plural = (count: number, one: string, many: string) => (count === 1 ? one : many);

/** Hero card wording: a welcome for a new user, otherwise how many clients still need measuring. */
export function heroSummary(measured: number, total: number): HeroSummary {
  if (total === 0) {
    return {
      title: 'Welcome to Stitchbook',
      subtitle: 'Add your first client to start recording measurements.',
    };
  }
  const waiting = total - measured;
  const subtitle = `${measured} of ${total} ${plural(total, 'client has', 'clients have')} measurements`;
  if (waiting === 0) return { title: 'Every client is measured', subtitle };
  return {
    title: `${waiting} ${plural(waiting, 'client is', 'clients are')} waiting to be measured`,
    subtitle,
  };
}

/** "Hello, Ada" from the owner's name, falling back to the business name, then plain "Hello". */
export function greeting(settings: Pick<AppSettings, 'ownerName' | 'businessName'>): string {
  const name = settings.ownerName?.trim() || settings.businessName.trim();
  return name ? `Hello, ${name}` : 'Hello';
}
