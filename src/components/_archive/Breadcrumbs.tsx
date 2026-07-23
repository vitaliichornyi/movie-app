'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface BreadcrumbsProps {
  dynamicTitle?: string;
  className?: string;
}

export default function Breadcrumbs({
  dynamicTitle,
  className = '',
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="w-full py-2">
      <ul className={`flex gap-2 min-w-0 w-full text-on-surface ${className}`}>
        <li className="shrink-0">
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
            <li
              className={`flex gap-2 ${isLast ? 'min-w-0' : 'shrink-0'}`}
              key={href}
            >
              <span className="font-extrabold shrink-0">·</span>
              {isLast ? (
                <span className="text-on-surface-variant truncate">
                  {label}
                </span>
              ) : (
                <Link className="shrink-0" href={href}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
