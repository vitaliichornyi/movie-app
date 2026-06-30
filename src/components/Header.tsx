import Link from 'next/link';
import Image from 'next/image';
import SearchButton from './ui/SearchButton';
import Button from './ui/Button';
import Nav from './ui/Nav';

export default function Header() {
  return (
    <header className="relative md:sticky px-6 md:px-12 top-0 left-0 w-full z-10 bg-surface/80 backdrop-blur-md">
      <div className="flex justify-between h-18">
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
    </header>
  );
}
