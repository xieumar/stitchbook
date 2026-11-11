import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ScreenProps = {
  children: ReactNode;
  /** Scrollable content (default). Set false for fixed layouts. */
  scroll?: boolean;
  /** Reserve room for the floating tab bar. Off for screens pushed above it. */
  tabBarSpace?: boolean;
};

const TAB_BAR_SPACE = 124;

/** Ground-coloured screen with the standard 20px gutter and 28px section gap. */
export function Screen({ children, scroll = true, tabBarSpace = true }: ScreenProps) {
  const bottom = tabBarSpace ? TAB_BAR_SPACE : 32;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-ground">
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-section px-gutter pt-4"
          contentContainerStyle={{ paddingBottom: bottom }}>
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 gap-section px-gutter pt-4" style={{ paddingBottom: bottom }}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
