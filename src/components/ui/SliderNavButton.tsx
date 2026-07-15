import ChevronLeftIcon from '@/src/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/src/icons/ChevronRightIcon';

interface SliderNavButtonProps {
  direction: 'prev' | 'next';
  btnRef: React.RefObject<HTMLButtonElement | null>;
}

export default function SliderNavButton({
  direction,
  btnRef,
}: SliderNavButtonProps) {
  const isPrev = direction === 'prev';

  return (
    <button
      type="button"
      ref={btnRef}
      className={`absolute flex items-center justify-center h-full w-6 md:w-12 top-0 text-on-surface-variant hover:text-on-surface disabled:opacity-0 cursor-pointer
        ${isPrev ? 'left-0 -translate-x-6 md:-translate-x-12' : 'right-0 translate-x-6 md:translate-x-12'}
        `}
    >
      {isPrev ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}
