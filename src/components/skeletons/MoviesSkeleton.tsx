export default function MoviesSkeleton() {
  const placeholders = Array.from({ length: 12 });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {placeholders.map((placeholder, index) => (
        <div
          key={index}
          className="animate-pulse aspect-2/3 rounded-2xl bg-surface-container"
        ></div>
      ))}
    </div>
  );
}
