'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from './ui/Logo';
import FacebookIcon from '../icons/socialmedia/FacebookIcon';
import XIcon from '../icons/socialmedia/XIcon';
import InstagramIcon from '../icons/socialmedia/InstagramIcon';
import ThreadsIcon from '../icons/socialmedia/ThreadsIcon';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/search') {
    return null;
  }

  return (
    <footer className="layout-wrap flex flex-col md:flex-row justify-between items-center gap-6 py-20">
      <Logo size="sm" />
      <nav>
        <ul className="flex gap-4 md:gap-10 text-sm font-medium tracking-wide text-on-surface-variant">
          <li>
            <Link
              className="hover:text-on-surface transition"
              href="/"
              prefetch={false}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-on-surface transition"
              href="/"
              prefetch={false}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-on-surface transition"
              href="/"
              prefetch={false}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-on-surface transition"
              href="/"
              prefetch={false}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-on-surface transition"
              href="/"
              prefetch={false}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <ul className="flex gap-3 pt-1 text-on-surface-variant">
        <li>
          <Link
            className="hover:text-on-surface transition"
            prefetch={false}
            href="https://www.facebook.com/"
          >
            <FacebookIcon />
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-on-surface transition"
            prefetch={false}
            href="https://x.com/"
          >
            <XIcon />
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-on-surface transition"
            prefetch={false}
            href="https://www.instagram.com/"
          >
            <InstagramIcon />
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-on-surface transition"
            prefetch={false}
            href="https://www.threads.com/"
          >
            <ThreadsIcon />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
