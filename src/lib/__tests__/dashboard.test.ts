import { activeClients, countMeasuredClients, greeting, heroSummary } from '../dashboard';

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
