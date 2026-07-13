interface DetailsListRowProps {
  label: string;
  children: React.ReactNode;
}

export default function DetailsListRow({
  label,
  children,
}: DetailsListRowProps) {
  return (
    <div className="flex text-sm text-on-surface-variant mb-3">
      <dt className="w-40 shrink-0">{label}</dt>
      <dd className="flex flex-1 flex-wrap gap-y-0.5 gap-x-1">{children}</dd>
    </div>
  );
}
