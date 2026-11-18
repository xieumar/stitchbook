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

/** Which slice of the client list a dashboard tile opens. */
export type ClientListFilter = 'all' | 'not-measured' | 'added-this-week' | 'updated-this-week';

const LIST_FILTERS: readonly ClientListFilter[] = [
  'all',
  'not-measured',
  'added-this-week',
  'updated-this-week',
];

/** Reads a route param into a filter; anything unknown means "all". */
export function parseClientListFilter(value: unknown): ClientListFilter {
  return LIST_FILTERS.find((filter) => filter === value) ?? 'all';
}

export const CLIENT_LIST_FILTER_LABEL: Record<ClientListFilter, string> = {
  all: 'All clients',
  'not-measured': 'Not measured yet',
  'added-this-week': 'Added this week',
  'updated-this-week': 'Updated this week',
};

const WEEK_DAYS = 7;

/** True when the timestamp is within the last `days` days (rolling, not calendar weeks). */
export function isWithinDays(iso: string, days: number, now: Date = new Date()): boolean {
  const age = now.getTime() - new Date(iso).getTime();
  return age <= days * 24 * 60 * 60 * 1000;
}

/**
 * Active clients in one dashboard slice, in the order given:
 * not measured = no records; added = created this week; updated = has a record saved or edited this week.
 */
export function filterByListFilter(
  clients: readonly ClientRecord[],
  records: readonly MeasurementRecord[],
  filter: ClientListFilter,
  now: Date = new Date(),
): ClientRecord[] {
  if (filter === 'all') return [...clients];
  const active = activeClients(clients);
  const withRecords = new Set(records.map((record) => record.clientId));
  const updated = new Set(
    records.filter((r) => isWithinDays(r.updatedAt, WEEK_DAYS, now)).map((r) => r.clientId),
  );

  switch (filter) {
    case 'not-measured':
      return active.filter((client) => !withRecords.has(client.id));
    case 'added-this-week':
      return active.filter((client) => isWithinDays(client.createdAt, WEEK_DAYS, now));
    case 'updated-this-week':
      return active.filter((client) => updated.has(client.id));
  }
}

export type DashboardStats = {
  total: number;
  notMeasured: number;
  addedThisWeek: number;
  updatedThisWeek: number;
};

/** The four numbers on the Home tiles. Each equals the length of the list its tile opens. */
export function dashboardStats(
  clients: readonly ClientRecord[],
  records: readonly MeasurementRecord[],
  now: Date = new Date(),
): DashboardStats {
  const count = (filter: ClientListFilter) =>
    filterByListFilter(clients, records, filter, now).length;
  return {
    total: activeClients(clients).length,
    notMeasured: count('not-measured'),
    addedThisWeek: count('added-this-week'),
    updatedThisWeek: count('updated-this-week'),
  };
}
