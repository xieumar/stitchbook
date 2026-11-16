export type ClientStatusFilter = 'active' | 'archived';

export type ClientFormTexts = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type ClientFormErrors = Partial<Record<'name' | 'phone' | 'email', string>>;

const digitsOnly = (text: string) => text.replace(/\D/g, '');

/** Matches the query against the name (any case) or the phone number (digits only). */
export function matchesClientQuery(client: ClientRecord, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === '') return true;
  if (client.name.toLowerCase().includes(needle)) return true;
  const needleDigits = digitsOnly(needle);
  return needleDigits !== '' && digitsOnly(client.phone ?? '').includes(needleDigits);
}

/** Keeps clients in the chosen status that match the query. */
export function filterClients(
  clients: readonly ClientRecord[],
  { query, status }: { query: string; status: ClientStatusFilter },
): ClientRecord[] {
  return clients.filter((client) => {
    const archived = !!client.archivedAt;
    if (status === 'archived' ? !archived : archived) return false;
    return matchesClientQuery(client, query);
  });
}

/** Alphabetical by name, ignoring case. Does not mutate the input. */
export function sortClients(clients: readonly ClientRecord[]): ClientRecord[] {
  return [...clients].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
}

export function countByStatus(clients: readonly ClientRecord[]): Record<ClientStatusFilter, number> {
  const archived = clients.filter((client) => !!client.archivedAt).length;
  return { active: clients.length - archived, archived };
}

export const EMPTY_CLIENT_TEXTS: ClientFormTexts = { name: '', phone: '', email: '', notes: '' };

export function clientToFormTexts(client: ClientRecord): ClientFormTexts {
  return {
    name: client.name,
    phone: client.phone ?? '',
    email: client.email ?? '',
    notes: client.notes ?? '',
  };
}

/** Name is required; phone and email are optional but must look right when given. */
export function validateClient(texts: ClientFormTexts): ClientFormErrors {
  const errors: ClientFormErrors = {};
  const name = texts.name.trim();
  const phone = texts.phone.trim();
  const email = texts.email.trim();

  if (name === '') errors.name = 'Enter the client’s name';
  else if (name.length > 80) errors.name = 'Name is too long (80 characters max)';

  if (phone !== '') {
    const digits = digitsOnly(phone).length;
    if (!/^[+\d\s().-]+$/.test(phone) || digits < 7 || digits > 15) {
      errors.phone = 'Enter a valid phone number';
    }
  }

  if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
}

/** Trims every field and drops empty optional ones, ready for the clients store. */
export function toClientInput(texts: ClientFormTexts, photoUri?: string): ClientInput {
  const optional = (text: string) => {
    const trimmed = text.trim();
    return trimmed === '' ? undefined : trimmed;
  };
  return {
    name: texts.name.trim(),
    phone: optional(texts.phone),
    email: optional(texts.email),
    notes: optional(texts.notes),
    photoUri,
  };
}
