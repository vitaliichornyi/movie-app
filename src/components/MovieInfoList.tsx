export interface MovieInfoItem {
  id: number;
  label: string;
  value: string | string[] | null;
}

export default function MovieInfoList({ items }: { items: MovieInfoItem[] }) {
  const filteredItems = items.filter((item) => item.value !== null);
  if (filteredItems.length === 0) return null;

  return (
    <dl className="pt-4 pb-2">
      {filteredItems.map((item) => {
        const displayValue = Array.isArray(item.value)
          ? item.value.join(', ')
          : item.value;
        return (
          <div
            key={item.id}
            className="flex text-sm text-on-surface-variant mb-3"
          >
            <dt className="w-40 shrink-0">{item.label}:</dt>
            <dd className="flex-1">{displayValue}</dd>
          </div>
        );
      })}
    </dl>
  );
}
