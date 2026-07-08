'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbsProps {
  dynamicTitle?: string;
}

export default function Breadcrumbs({ dynamicTitle }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav>
      <ol className="flex py-2 gap-2 text-on-surface">
        <li>
          <Link href="/">Home</Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          const label =
            isLast && dynamicTitle
              ? dynamicTitle
              : segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li className="flex items-center gap-2" key={href}>
              <span className="font-extrabold">·</span>
              {isLast ? (
                <span className="text-on-surface-variant">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
