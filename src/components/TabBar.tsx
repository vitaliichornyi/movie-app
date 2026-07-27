'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import HomeIcon from '../icons/HomeIcon';
import MovieIcon from '../icons/MovieIcon';
import SearchIcon from '../icons/SearchIcon';
import ProfileIcon from '../icons/ProfileIcon';

const tabBarItems = [
  {
    id: 1,
    label: 'Home',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    id: 2,
    label: 'Movies',
    icon: <MovieIcon />,
    href: '/movies',
  },
  {
    id: 3,
    label: 'Search',
    icon: <SearchIcon />,
    href: '/search',
  },
  {
    id: 4,
    label: 'Profile',
    icon: <ProfileIcon />,
    href: '/',
  },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-20 bg-surface/80 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <ul className="flex px-6">
        {tabBarItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <li key={item.id} className="flex-1">
              <Link
                className={`flex flex-col items-center gap-1 py-2 text-xs transition
        ${
          isActive
            ? 'text-on-surface font-medium'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
                href={item.href}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
