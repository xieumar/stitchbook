import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type KeyboardFormProps = {
  children: ReactNode;
  /** Reserve room for the floating tab bar. Off for screens pushed above it. */
  tabBarSpace?: boolean;
};

const TAB_BAR_SPACE = 124;
/** Extra scroll room so the last field and the save button clear the keyboard. */
const KEYBOARD_CLEARANCE = 32;

/**
 * Screen shell for long forms. Keeps the focused field above the keyboard
 * (iOS adjusts the scroll insets itself; Android relies on the window resizing),
 * keeps taps working while the keyboard is open, and dismisses it on drag.
 */
export function KeyboardForm({ children, tabBarSpace = false }: KeyboardFormProps) {
  const bottom = (tabBarSpace ? TAB_BAR_SPACE : 32) + KEYBOARD_CLEARANCE;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ground">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-section px-gutter pt-4"
          contentContainerStyle={{ paddingBottom: bottom }}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
