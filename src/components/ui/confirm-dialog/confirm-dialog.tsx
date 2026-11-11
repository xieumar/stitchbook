import { Dialog } from 'heroui-native';
import { View } from 'react-native';

import { PillButton } from '../button';

export type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** Use for destructive actions such as archiving a client. */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Confirmation for destructive or irreversible actions. */
export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog isOpen={visible} onOpenChange={(open) => (open ? undefined : onCancel())}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="rounded-card">
          <Dialog.Title className="font-outfit-semibold text-[21px] text-ink">{title}</Dialog.Title>
          <Dialog.Description className="font-outfit text-[15px] text-muted">
            {message}
          </Dialog.Description>
          <View className="mt-5 flex-row justify-end gap-3">
            <PillButton label={cancelLabel} tone="soft" onPress={onCancel} />
            <PillButton
              label={confirmLabel}
              tone={destructive ? 'danger' : 'primary'}
              onPress={onConfirm}
            />
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
