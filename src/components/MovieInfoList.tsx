export interface MovieInfoItem {
  id: number;
  label: string;
  value: string | string[];
}

export default function MovieInfoList({ items }: { items: MovieInfoItem[] }) {
  return (
    <dl className="pt-4 pb-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex text-sm text-on-surface-variant mb-3"
        >
          <dt className="w-40 shrink-0">{item.label}</dt>
          <dd className="flex flex-1 flex-wrap gap-y-0.5 gap-x-1">
            {Array.isArray(item.value) ? (
              item.value.length !== 0 ? (
                item.value.map((i, index) => (
                  <span key={index}>
                    {i}
                    {index < item.value.length - 1 && ','}
                  </span>
                ))
              ) : (
                <span>Unknown</span>
              )
            ) : (
              <span>{item.value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
