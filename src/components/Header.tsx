'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

import Nav from './Nav';
import SearchButton from './ui/SearchButton';
import Button from './ui/Button';
import Logo from './ui/Logo';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <motion.header
      style={{ height: 'var(--header-height)' }}
      className={`relative md:sticky top-0 w-full flex items-center z-20 bg-transparent transition duration-400 ease-in-out
        ${isScrolled ? 'md:bg-surface' : ''}`}
    >
      <div className="layout-wrap flex justify-between">
        <div className="flex items-center gap-6">
          <Logo />
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
