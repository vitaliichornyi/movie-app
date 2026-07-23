import { ElementType } from 'react';

interface HeadlineProps {
  as: ElementType;
  variant: 'title1' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  totalResults?: number;
}

const styles = {
  title1:
    'text-[2.6rem] leading-11 lg:text-[2.8rem] lg:leading-12 font-bold tracking-tight text-center mb-4 line-clamp-3',
  h1: 'text-[2.0rem] font-bold tracking-tight mt-4 mb-2',
  h2: 'text-[1.8rem] leading-8 font-bold tracking-tight mt-12 mb-4 line-clamp-2',
  h3: 'text-[1.4rem] leading-7 font-bold tracking-normal mb-2',
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
