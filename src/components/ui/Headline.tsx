import { ElementType } from 'react';

interface HeadlineProps {
  as: ElementType;
  variant: 'title1' | 'h1' | 'h2';
  children: React.ReactNode;
  totalResults?: number;
}

const styles = {
  title1:
    'text-[2.6rem] leading-11 lg:text-[2.8rem] lg:leading-12 font-bold tracking-tight text-center mb-4 line-clamp-3',
  h1: 'text-[2.2rem] leading-10 font-bold tracking-tight mt-2 mb-4 ',
  h2: 'text-[1.8rem] leading-8 font-bold tracking-tight mt-12 mb-4 line-clamp-2',
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
