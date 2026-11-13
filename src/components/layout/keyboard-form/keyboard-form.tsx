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
 * Screen shell for long forms: same layout as <Screen>, wrapped in a
 * KeyboardAvoidingView so the form lifts above the keyboard. It uses 'padding' on
 * iOS and 'height' on Android (KeyboardAvoidingView listens to keyboard events, so it
 * also works when Android is edge-to-edge). Taps keep working while the keyboard is
 * open and dragging dismisses it. Works in Expo Go; swap in
 * react-native-keyboard-controller's KeyboardAwareScrollView once a dev build is used.
 */
export function KeyboardForm({ children, tabBarSpace = false }: KeyboardFormProps) {
  const bottom = (tabBarSpace ? TAB_BAR_SPACE : 32) + KEYBOARD_CLEARANCE;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView edges={['top']} className="flex-1 bg-ground">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-section px-gutter pt-4"
          contentContainerStyle={{ paddingBottom: bottom }}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
