import {
  activeClients,
  countMeasuredClients,
  dashboardStats,
  filterByListFilter,
  greeting,
  heroSummary,
  parseClientListFilter,
  quickSearchClients,
  type ClientListFilter,
} from '../dashboard';

const client = (id: string, archivedAt?: string): ClientRecord =>
  ({ id, name: id, createdAt: '2026-01-01T00:00:00.000Z', archivedAt }) as ClientRecord;

const record = (clientId: string): MeasurementRecord => ({ clientId }) as MeasurementRecord;

describe('countMeasuredClients', () => {
  it('counts active clients that have a record, ignoring archived ones', () => {
    const clients = [client('a'), client('b'), client('c', '2026-02-01T00:00:00.000Z')];
    const records = [record('a'), record('a'), record('c')];

    expect(activeClients(clients).map((c) => c.id)).toEqual(['a', 'b']);
    expect(countMeasuredClients(clients, records)).toEqual({ measured: 1, total: 2 });
  });
});

describe('heroSummary', () => {
  it('welcomes a user with no clients', () => {
    expect(heroSummary(0, 0).title).toBe('Welcome to Stitchbook');
  });

  it('says how many clients are waiting', () => {
    expect(heroSummary(2, 5)).toEqual({
      title: '3 clients are waiting to be measured',
      subtitle: '2 of 5 clients have measurements',
    });
    expect(heroSummary(0, 1)).toEqual({
      title: '1 client is waiting to be measured',
      subtitle: '0 of 1 client has measurements',
    });
  });

  it('celebrates when everyone is measured', () => {
    expect(heroSummary(4, 4).title).toBe('Every client is measured');
  });
});

describe('greeting', () => {
  it('prefers the owner name, then the business name, then plain Hello', () => {
    expect(greeting({ ownerName: ' Folake ', businessName: 'Stitches' })).toBe('Hello, Folake');
    expect(greeting({ businessName: 'Stitches' })).toBe('Hello, Stitches');
    expect(greeting({ businessName: '' })).toBe('Hello');
  });
});

const NOW = new Date('2026-06-10T12:00:00.000Z');
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86_400_000).toISOString();

const timed = (id: string, createdAt: string, archivedAt?: string): ClientRecord =>
  ({ id, name: id, createdAt, archivedAt }) as ClientRecord;
const recordAt = (clientId: string, updatedAt: string): MeasurementRecord =>
  ({ clientId, updatedAt }) as MeasurementRecord;

describe('dashboard stats and filters', () => {
  const clients = [
    timed('new', daysAgo(2)),
    timed('old-measured', daysAgo(40)),
    timed('old-stale', daysAgo(40)),
    timed('gone', daysAgo(1), daysAgo(0)),
  ];
  const records = [
    recordAt('old-measured', daysAgo(3)),
    recordAt('old-stale', daysAgo(30)),
    recordAt('gone', daysAgo(1)),
  ];
  const ids = (filter: ClientListFilter) =>
    filterByListFilter(clients, records, filter, NOW).map((c) => c.id);

  it('slices active clients for each tile', () => {
    expect(ids('not-measured')).toEqual(['new']);
    expect(ids('added-this-week')).toEqual(['new']);
    expect(ids('updated-this-week')).toEqual(['old-measured']);
  });

  it('keeps every tile count equal to the list it opens', () => {
    expect(dashboardStats(clients, records, NOW)).toEqual({
      total: 3,
      notMeasured: 1,
      addedThisWeek: 1,
      updatedThisWeek: 1,
    });
  });

  it('reads route params safely', () => {
    expect(parseClientListFilter('not-measured')).toBe('not-measured');
    expect(parseClientListFilter('nonsense')).toBe('all');
    expect(parseClientListFilter(undefined)).toBe('all');
  });
});

describe('quickSearchClients', () => {
  const named = (name: string, phone?: string, archivedAt?: string) =>
    ({ id: name, name, phone, archivedAt }) as ClientRecord;
  const clients = [
    named('Zara Bello', '0803 111 2222'),
    named('Amara Okafor'),
    named('Amaka Obi', undefined, '2026-01-01T00:00:00.000Z'),
    named('Tunde Bello'),
  ];

  it('finds nothing for a blank query', () => {
    expect(quickSearchClients(clients, '  ')).toEqual({ results: [], total: 0 });
  });

  it('matches name or phone, active only, A to Z', () => {
    expect(quickSearchClients(clients, 'bello').results.map((c) => c.name)).toEqual([
      'Tunde Bello',
      'Zara Bello',
    ]);
    expect(quickSearchClients(clients, '0803').results.map((c) => c.name)).toEqual(['Zara Bello']);
    expect(quickSearchClients(clients, 'ama').results.map((c) => c.name)).toEqual(['Amara Okafor']);
  });

  it('cuts the list to the limit but reports the full count', () => {
    expect(quickSearchClients(clients, 'o', 2)).toMatchObject({ total: 3 });
    expect(quickSearchClients(clients, 'o', 2).results).toHaveLength(2);
  });
});
