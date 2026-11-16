import { useState } from 'react';

import { ConfirmDialog, PillButton, useAppToast } from '@/components/ui';
import { useClientsStore } from '@/store';

export type ArchiveClientActionProps = {
  client: ClientRecord;
};

/**
 * Archive or restore button with a confirmation step. Archiving only hides the
 * client from the Active list; their measurements and history are all kept.
 */
export function ArchiveClientAction({ client }: ArchiveClientActionProps) {
  const [confirming, setConfirming] = useState(false);
  const toast = useAppToast();
  const archiveClient = useClientsStore((state) => state.archiveClient);
  const restoreClient = useClientsStore((state) => state.restoreClient);

  const archived = !!client.archivedAt;

  const confirm = () => {
    setConfirming(false);
    if (archived) {
      restoreClient(client.id);
      toast.success('Client restored', client.name);
    } else {
      archiveClient(client.id);
      toast.success('Client archived', `${client.name} and their records are kept.`);
    }
  };

  return (
    <>
      <PillButton
        label={archived ? 'Restore client' : 'Archive client'}
        tone="soft"
        icon={archived ? 'arrow-undo-outline' : 'archive-outline'}
        onPress={() => setConfirming(true)}
        className="self-start"
      />
      <ConfirmDialog
        visible={confirming}
        title={archived ? `Restore ${client.name}?` : `Archive ${client.name}?`}
        message={
          archived
            ? 'They will appear in your Active clients again.'
            : 'They move to the Archived tab. Nothing is deleted, and you can restore them any time.'
        }
        confirmLabel={archived ? 'Restore' : 'Archive'}
        destructive={!archived}
        onConfirm={confirm}
        onCancel={() => setConfirming(false)}
      />
    </>
  );
}
