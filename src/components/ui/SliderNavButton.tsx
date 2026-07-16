import ChevronLeftIcon from '@/src/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/src/icons/ChevronRightIcon';

interface SliderNavButtonProps {
  heroSlider?: boolean;
  direction: 'prev' | 'next';
  btnRef: React.Ref<HTMLButtonElement>;
}

export default function SliderNavButton({
  heroSlider,
  direction,
  btnRef,
}: SliderNavButtonProps) {
  const isPrev = direction === 'prev';

  return (
    <button
      type="button"
      ref={btnRef}
      className={`absolute flex items-center justify-center h-full w-6 md:w-12 top-0 text-on-surface-variant hover:text-on-surface disabled:opacity-0 cursor-pointer z-10
        ${isPrev ? 'left-0' : 'right-0'}
        ${
          heroSlider
            ? 'translate-x-0 -translate-y-5'
            : isPrev
              ? '-translate-x-6 md:-translate-x-12'
              : 'translate-x-6 md:translate-x-12'
        }
        `}
    >
      {isPrev ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}
