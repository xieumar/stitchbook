import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Height of the floating bar itself. */
export const TAB_BAR_HEIGHT = 74;
/** Breathing room kept between the last content and the top of the bar. */
const CONTENT_GAP = 36;

/**
 * How far the floating bar sits above the bottom edge of the screen. iOS keeps the
 * bar level with the home indicator area. Android adds a 12px gap above the system
 * navigation (gesture handle or buttons), which otherwise overlaps the bar's lower edge.
 */
export function useTabBarOffset(): number {
  const { bottom } = useSafeAreaInsets();
  return Platform.OS === 'android' ? Math.max(bottom, 16) + 12 : Math.max(bottom, 14);
}

/** Bottom padding that keeps scrolling content clear of the floating bar. */
export function useTabBarContentSpace(): number {
  return useTabBarOffset() + TAB_BAR_HEIGHT + CONTENT_GAP;
}
