export default function ReviewSliderSkeleton() {
  const placeholders = Array.from({ length: 12 });

  return (
    <div
      className="grid grid-flow-col overflow-hidden h-44 gap-6 
        auto-cols-[100%]
        sm:auto-cols-[calc((100%-24px)/2)]
        lg:auto-cols-[calc((100%-3*24px)/4)]
        2xl:auto-cols-[calc((100%-5*24px)/6)] "
    >
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`w-full h-full rounded-2xl animate-pulse bg-surface-container`}
        ></div>
      ))}
    </div>
  );
}
