'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabBarItemProps {
  children: React.ReactNode;
  href: string;
}

export default function TabBarItem({ children, href }: TabBarItemProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      className={`flex flex-col items-center justify-between flex-1 gap-1 py-2 text-xs transition
        ${
          isActive
            ? 'text-on-surface font-medium'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      href={href}
    >
      {children}
    </Link>
  );
}
