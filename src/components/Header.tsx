import SearchButton from './ui/SearchButton';

export default function Header() {
  return (
    <header className="w-full">
      <div className="px-4 h-16 flex item-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/">
            <img src="logo.svg" alt="Movie" />
          </a>
          <nav>
            <ul className="flex gap-4">
              <li>
                <a href="/movies">Movies</a>
              </li>
              <li>
                <a href="/tv">TV Shows</a>
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
