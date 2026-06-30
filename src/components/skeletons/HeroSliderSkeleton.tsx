export default function HeroSliderSkeleton() {
  const placeholders = Array.from({ length: 3 });
  return (
    <div className="w-full h-140 flex justify-center gap-[24px] overflow-hidden pb-[40px] select-none">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`w-full h-full max-w-100 md:max-w-180 lg:max-w-240 rounded-2xl animate-pulse bg-surface-container shrink-0
            `}
        ></div>
      ))}
    </div>
  );
}

// ${index != 1 ? 'hidden md:block' : ''}
