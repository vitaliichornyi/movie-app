'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import SearchButton from './ui/SearchButton';
import Button from './ui/Button';
import Nav from './ui/Nav';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <motion.header
      style={{ height: 'var(--header-height)' }}
      className={`relative md:sticky top-0 w-full flex items-center z-10 bg-transparent transition
        ${isScrolled ? 'md:bg-surface' : ''}`}
    >
      <div className="flex justify-between layout-wrap">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Movie logo"
              width={122}
              height={34}
              priority
            />
          </Link>
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-4">
            <SearchButton />
            <Button type="secondary" size="sm">
              Login
            </Button>
          </div>
          <Button type="primary" size="sm">
            Sign up
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
