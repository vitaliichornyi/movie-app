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
      <ol className="flex gap-1">
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

          console.log(label);
          return (
            <li className="flex items-center gap-1" key={href}>
              <span>/</span>
              {isLast ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
