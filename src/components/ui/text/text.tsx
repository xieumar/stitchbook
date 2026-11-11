import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

/** Type scale from docs/design-guidelines.md. Nothing is smaller than 12px. */
const text = tv({
  variants: {
    variant: {
      screenTitle: 'font-outfit-semibold text-[23px] leading-[28px]',
      heroTitle: 'font-outfit-semibold text-[24px] leading-[30px]',
      sectionTitle: 'font-outfit-semibold text-[21px] leading-[26px]',
      bigNumber: 'font-outfit-semibold text-[32px] leading-[36px]',
      name: 'font-outfit-semibold text-[16px] leading-[20px]',
      body: 'font-outfit text-[15px] leading-[21px]',
      caption: 'font-outfit text-[13px] leading-[18px]',
      tabLabel: 'font-outfit-medium text-[12px] leading-[16px]',
    },
    tone: {
      ink: 'text-ink',
      muted: 'text-muted',
      accent: 'text-accent-text',
      hero: 'text-hero-ink',
      heroSub: 'text-hero-sub',
      inverse: 'text-white',
    },
  },
  defaultVariants: { variant: 'body', tone: 'ink' },
});

export type TextProps = RNTextProps & VariantProps<typeof text>;

export function Text({ variant, tone, className, ...props }: TextProps) {
  return <RNText className={text({ variant, tone, className })} {...props} />;
}
