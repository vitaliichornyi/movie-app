import { ElementType } from 'react';

interface HeadlineProps {
  as: ElementType;
  variant: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

const styles = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-semibold tracking-tight pb-4 pt-8',
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
