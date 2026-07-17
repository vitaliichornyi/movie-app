export default function CreditsSliderSkeleton() {
  const placeholders = Array.from({ length: 20 });

  return (
    <div
      className="grid grid-flow-col overflow-hidden h-44 gap-6 
        auto-cols-[calc((100%-3*24px)/4)]
        sm:auto-cols-[calc((100%-4*24px)/5)]
        md:auto-cols-[calc((100%-5*24px)/6)]
        lg:auto-cols-[calc((100%-7*24px)/8)]
        xl:auto-cols-[calc((100%-9*24px)/10)]
        2xl:auto-cols-[calc((100%-13*24px)/14)] "
    >
      {placeholders.map((_, index) => {
        const a = Math.floor(Math.random() * 21) + 80;
        const b = Math.floor(Math.random() * 31) + 40;
        const c = Math.floor(Math.random() * 21) + 60;

        return (
          <div key={index} className="flex flex-col gap-4.5">
            <div
              className={`w-full aspect-square rounded-2xl animate-pulse bg-surface-container`}
            ></div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div
                  style={{ width: `${a}%` }}
                  className="h-3 rounded-sm animate-pulse bg-surface-container"
                ></div>
                <div
                  style={{ width: `${b}%` }}
                  className={`h-3 rounded-sm animate-pulse bg-surface-container`}
                ></div>
              </div>
              <div
                style={{ width: `${c}%` }}
                className="h-2.5 rounded-sm animate-pulse bg-surface-container"
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
