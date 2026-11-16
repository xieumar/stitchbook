import { PREDEFINED_TEMPLATES } from '@/constants';

import { useActivityStore } from '../activity';
import { useClientsStore } from '../clients';
import { useMeasurementsStore } from '../measurements';

beforeEach(() => {
  useClientsStore.setState({ clients: {} });
  useMeasurementsStore.setState({ records: {} });
  useActivityStore.setState({ entries: [] });
});

describe('client registration', () => {
  it('logs the new client to activity, linked to that client', () => {
    const id = useClientsStore.getState().addClient({ name: 'Amara Okafor' });

    const [entry] = useActivityStore.getState().entries;
    expect(entry).toMatchObject({ type: 'client.added', clientId: id, message: 'Added Amara Okafor' });
  });
});

describe('archiving', () => {
  it('keeps the client and every measurement record', () => {
    const { addClient, archiveClient } = useClientsStore.getState();
    const clientId = addClient({ name: 'Folake Adeyemi' });
    const recordId = useMeasurementsStore.getState().addRecord({
      clientId,
      templateSnapshot: PREDEFINED_TEMPLATES[0],
      unit: 'cm',
      values: [{ key: 'waist', label: 'Waist', value: 70 }],
    });

    archiveClient(clientId);

    const client = useClientsStore.getState().clients[clientId];
    expect(client.archivedAt).toBeDefined();
    expect(useMeasurementsStore.getState().records[recordId]).toBeDefined();
  });
});

describe('editing', () => {
  it('clears the photo when the update sets it to undefined', () => {
    const { addClient, updateClient } = useClientsStore.getState();
    const id = addClient({ name: 'Tunde Bello', photoUri: 'file:///photo.jpg' });

    updateClient(id, { name: 'Tunde Bello', photoUri: undefined });

    expect(useClientsStore.getState().clients[id].photoUri).toBeUndefined();
  });
});
