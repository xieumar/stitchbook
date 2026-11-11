import { useToast } from 'heroui-native';
import { useMemo } from 'react';

/**
 * Success / error / info feedback. HeroUINativeProvider (root layout) renders
 * the toasts, so this hook can be used from any screen.
 */
export function useAppToast() {
  const { toast } = useToast();

  return useMemo(
    () => ({
      success: (label: string, description?: string) =>
        toast.show({ variant: 'success', label, description }),
      error: (label: string, description?: string) =>
        toast.show({ variant: 'danger', label, description }),
      info: (label: string, description?: string) =>
        toast.show({ variant: 'default', label, description }),
    }),
    [toast],
  );
}
