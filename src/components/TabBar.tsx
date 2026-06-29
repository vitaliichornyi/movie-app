import TabBarItem from './ui/TabBarItem';

import HomeIcon from '../icons/HomeIcon';
import MovieIcon from '../icons/MovieIcon';
import SearchIcon from '../icons/SearchIcon';
import ProfileIcon from '../icons/ProfileIcon';

export default function TabBar() {
  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 z-20">
      <nav className="flex px-6 bg-surface/80 backdrop-blur-md">
        <TabBarItem href="/">
          <HomeIcon />
          <span>Home</span>
        </TabBarItem>
        <TabBarItem href="/movies">
          <MovieIcon />
          <span>Movies</span>
        </TabBarItem>
        <TabBarItem href="/search">
          <SearchIcon />
          <span>Search</span>
        </TabBarItem>
        <TabBarItem href="/profile">
          <ProfileIcon />
          <span>Profile</span>
        </TabBarItem>
      </nav>
    </div>
  );
}
