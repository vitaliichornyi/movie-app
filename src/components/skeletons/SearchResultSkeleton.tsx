export default function SearchResultSkeleton() {
  const placeholders = Array.from({ length: 9 });
  return (
    <div className="grid grid-cols-3 gap-4">
      {placeholders.map((_placeholder, index) => (
        <div
          key={index}
          className="animate-pulse aspect-2/3 rounded-2xl bg-surface-container"
        ></div>
      ))}
    </div>
  );
}
