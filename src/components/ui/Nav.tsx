import NavItem from './NavItem';

export default function Nav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-4">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/movies">Movies</NavItem>
      </ul>
    </nav>
  );
}
