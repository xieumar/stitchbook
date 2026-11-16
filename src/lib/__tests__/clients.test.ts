import {
  clientToFormTexts,
  countByStatus,
  filterClients,
  matchesClientQuery,
  sortClients,
  toClientInput,
  validateClient,
} from '../clients';

const make = (name: string, extra: Partial<ClientRecord> = {}): ClientRecord => ({
  id: name,
  name,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...extra,
});

const amara = make('Amara Okafor', { phone: '+234 803 555 0142' });
const folake = make('folake Adeyemi', { phone: '0802-555-0187' });
const tunde = make('Tunde Bello', { archivedAt: '2026-02-01T00:00:00.000Z' });

describe('matchesClientQuery', () => {
  it('matches everything for an empty query', () => {
    expect(matchesClientQuery(amara, '  ')).toBe(true);
  });

  it('matches names regardless of case, anywhere in the name', () => {
    expect(matchesClientQuery(amara, 'okaf')).toBe(true);
    expect(matchesClientQuery(folake, 'FOLAKE')).toBe(true);
    expect(matchesClientQuery(amara, 'bello')).toBe(false);
  });

  it('matches phone numbers by digits, ignoring spaces and punctuation', () => {
    expect(matchesClientQuery(amara, '803 555')).toBe(true);
    expect(matchesClientQuery(folake, '8025550187')).toBe(true);
    expect(matchesClientQuery(folake, '999')).toBe(false);
    expect(matchesClientQuery(folake, '802-555')).toBe(true);
  });

  it('does not treat a non-digit query as a phone match', () => {
    expect(matchesClientQuery(make('Zed'), 'abc')).toBe(false);
  });
});

describe('filterClients', () => {
  const all = [amara, folake, tunde];

  it('splits active from archived', () => {
    expect(filterClients(all, { query: '', status: 'active' })).toEqual([amara, folake]);
    expect(filterClients(all, { query: '', status: 'archived' })).toEqual([tunde]);
  });

  it('applies the search inside the chosen status', () => {
    expect(filterClients(all, { query: 'tunde', status: 'active' })).toEqual([]);
    expect(filterClients(all, { query: 'tunde', status: 'archived' })).toEqual([tunde]);
  });
});

describe('sortClients / countByStatus', () => {
  it('sorts alphabetically ignoring case without mutating the input', () => {
    const input = [tunde, folake, amara];
    expect(sortClients(input).map((c) => c.name)).toEqual([
      'Amara Okafor',
      'folake Adeyemi',
      'Tunde Bello',
    ]);
    expect(input[0]).toBe(tunde);
  });

  it('counts active and archived', () => {
    expect(countByStatus([amara, folake, tunde])).toEqual({ active: 2, archived: 1 });
  });
});

describe('validateClient', () => {
  const valid = { name: 'Amara', phone: '', email: '', notes: '' };

  it('accepts a name only', () => {
    expect(validateClient(valid)).toEqual({});
  });

  it('requires a name', () => {
    expect(validateClient({ ...valid, name: '   ' }).name).toBeDefined();
  });

  it('checks phone shape and length only when given', () => {
    expect(validateClient({ ...valid, phone: '+234 803 555 0142' }).phone).toBeUndefined();
    expect(validateClient({ ...valid, phone: '12345' }).phone).toBeDefined();
    expect(validateClient({ ...valid, phone: 'call me' }).phone).toBeDefined();
  });

  it('checks email shape only when given', () => {
    expect(validateClient({ ...valid, email: 'a@b.co' }).email).toBeUndefined();
    expect(validateClient({ ...valid, email: 'not-an-email' }).email).toBeDefined();
  });
});

describe('toClientInput / clientToFormTexts', () => {
  it('trims and drops empty optional fields', () => {
    expect(
      toClientInput({ name: '  Amara ', phone: ' ', email: 'a@b.co ', notes: '' }, 'file:///p.jpg'),
    ).toEqual({
      name: 'Amara',
      phone: undefined,
      email: 'a@b.co',
      notes: undefined,
      photoUri: 'file:///p.jpg',
    });
  });

  it('turns a client back into form text', () => {
    expect(clientToFormTexts(amara)).toEqual({
      name: 'Amara Okafor',
      phone: '+234 803 555 0142',
      email: '',
      notes: '',
    });
  });
});
