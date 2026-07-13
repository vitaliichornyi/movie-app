import Link from 'next/link';

interface CountryTagProps {
  isoCode: string;
  children: React.ReactNode;
}

export default function CountryTag({ isoCode, children }: CountryTagProps) {
  return (
    <Link
      className="text-sm px-2 py-0.5 rounded-full bg-secondary hover:bg-secondary-hover backdrop-blur-xs transition text-on-surface"
      href={`/movies?with_origin_country=${isoCode}`}
    >
      {children}
    </Link>
  );
}
