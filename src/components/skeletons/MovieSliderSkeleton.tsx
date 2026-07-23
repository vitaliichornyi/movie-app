export default function MovieSliderSkeleton() {
  const placeholders = Array.from({ length: 20 });
  return (
    <div className="flex flex-col">
      <div className="w-40 h-6 mt-14.5 mb-3.5 rounded-2xl animate-pulse bg-surface-container"></div>
      <div
        className="grid grid-flow-col overflow-hidden gap-4 
        auto-cols-[calc((100%-2*16px)/3)]
        sm:auto-cols-[calc((100%-3*16px)/4)]
        md:auto-cols-[calc((100%-4*16px)/5)]
        lg:auto-cols-[calc((100%-5*16px)/6)]
        xl:auto-cols-[calc((100%-6*16px)/7)]
        2xl:auto-cols-[calc((100%-7*16px)/8)]"
      >
        {placeholders.map((_, index) => (
          <div
            className="w-full aspect-2/3 rounded-2xl animate-pulse bg-surface-container shrink-0"
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}
