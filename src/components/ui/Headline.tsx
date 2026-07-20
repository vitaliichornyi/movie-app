import { ElementType } from 'react';

interface HeadlineProps {
  as: ElementType;
  variant: 'title1' | 'title2' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  totalResults?: number;
}

const styles = {
  title1: 'text-5xl lg:text-6xl font-bold tracking-tight text-center pb-1',
  title2: 'text-4xl lg:text-5xl font-bold tracking-tight text-center pb-1',
  h1: 'text-[2.4rem] font-bold tracking-tight pb-4 pt-6',
  h2: 'text-[1.8rem] font-bold tracking-tight pb-4 pt-12',
  h3: 'text-[1.4rem] font-bold tracking-normal',
};
export default function Headline({
  as: Headline,
  variant,
  children,
  totalResults,
}: HeadlineProps) {
  return (
    <div className="flex gap-3 items-baseline">
      <Headline className={styles[variant]}>{children}</Headline>
      <span className="text-[1.4rem] text-on-surface-variant">
        {totalResults}
      </span>
    </div>
  );
}
