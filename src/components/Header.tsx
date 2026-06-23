import Link from 'next/link';
import Image from 'next/image';
import SearchButton from './ui/SearchButton';

export default function Header() {
  return (
    <header className="w-full">
      <div className="h-16 flex item-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Movie Logo"
              width={122}
              height={34}
              priority
            />
          </Link>

          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/movies">Movies</Link>
              </li>
              <li>
                <Link href="/tv">TV Shows</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchButton />
        </div>
      </div>
    </header>
  );
}
