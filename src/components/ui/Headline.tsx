import { ElementType } from 'react';

interface HeadlineProps {
  as: ElementType;
  variant: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

const styles = {
  h1: 'text-[2.4rem] font-bold tracking-tight pb-4 pt-6',
  h2: 'text-[1.8rem] font-bold tracking-tight pb-4 pt-12',
  h3: 'text-sm font-semibold uppercase tracking-wider',
  h4: 'text-xs font-medium',
};
export default function Headline({
  as: Headline,
  variant,
  children,
}: HeadlineProps) {
  return <Headline className={styles[variant]}>{children}</Headline>;
}
