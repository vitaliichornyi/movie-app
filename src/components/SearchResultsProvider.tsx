import { useInfiniteQuery } from '@tanstack/react-query';
import useDebouncedQuery from '../hooks/useDebouncedQuery';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import { Movie, PaginatedResponse } from '../types/movies';

import SearchField from './ui/SearchField';
import SearchResultSkeleton from './skeletons/SearchResultSkeleton';
import PosterImage from './PosterImage';
import StatusMessage from './StatusMessage';
import Button from './ui/Button';
import SearchIcon from '../icons/SearchIcon';
import { useEffect, useState } from 'react';
import IconButton from './ui/IconButton';
import DeleteIcon from '../icons/DeleteIcon';
import HistoryIcon from '../icons/HistoryIcon';

interface SuggestionItem {
  id: number;
  title: string;
}

const defaultSuggestionList: SuggestionItem[] = [
  {
    id: 157336,
    title: 'Interstellar',
  },
  {
    id: 27205,
    title: 'Inception',
  },
  {
    id: 77338,
    title: 'Intouchables',
  },
  {
    id: 550,
    title: 'Fight Club',
  },
  {
    id: 11324,
    title: 'Shutter Island',
  },
  {
    id: 522627,
    title: 'The Gentlemen',
  },
];

async function searchMovies(
  pageParam: number,
  query: string,
): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(`/api/search?query=${query}&page=${pageParam}`);
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }
  return data;
}

interface SearchResultsProviderProps {
  context: 'modal' | 'page';
}

export default function SearchResultsProvider({
  context,
}: SearchResultsProviderProps) {
  const { inputValue, setInputValue, debouncedQuery, setInstantQuery } =
    useDebouncedQuery();

  const [triggerRef] = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const {
    data,
    status,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchResults', debouncedQuery],
    queryFn: ({ pageParam }) => searchMovies(pageParam, debouncedQuery),

    enabled: debouncedQuery.length > 2,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPageParam < lastPage.total_pages) {
        return lastPageParam + 1;
      }
      return undefined;
    },
  });

  const searchResults = data?.pages.flatMap((page) => page.results) || [];

  const isFirstLoading = status === 'pending' && fetchStatus === 'fetching';
  const isError = status === 'error';
  const isReady = !isFirstLoading && !isError && debouncedQuery.length > 2;
  const hasMovie = searchResults.length > 0;

  const showSuggestions = inputValue.trim().length < 2;
  const [suggestionList, setSuggestionList] = useState<SuggestionItem[]>([]);

  useEffect(() => {
    const storageData = JSON.parse(
      localStorage.getItem('recentlySearched') || '[]',
    );
    setSuggestionList(storageData);
  }, []);

  const handleMovieClick = (id: number, title: string) => {
    const movie: SuggestionItem = { id, title };

    const storageData: SuggestionItem[] = JSON.parse(
      localStorage.getItem('recentlySearched') || '[]',
    );
    const filteredStorageData = storageData
      .filter((item) => item.id !== id)
      .slice(0, 9);
    filteredStorageData.unshift(movie);

    localStorage.setItem(
      'recentlySearched',
      JSON.stringify(filteredStorageData),
    );
    setSuggestionList(filteredStorageData);
  };

  const handleDeleteSuggestion = (id: number) => {
    const storageData: SuggestionItem[] = JSON.parse(
      localStorage.getItem('recentlySearched') || '[]',
    );
    const filteredStorageData = storageData.filter((item) => item.id !== id);

    localStorage.setItem(
      'recentlySearched',
      JSON.stringify(filteredStorageData),
    );
    setSuggestionList(filteredStorageData);
  };

  return (
    <>
      <SearchField
        context={context}
        value={inputValue}
        onChange={setInputValue}
      />
      <section
        className={
          context === 'modal' ? 'h-120 overflow-y-auto rounded-xl' : ''
        }
      >
        {showSuggestions && (
          <div className="flex flex-col">
            {suggestionList.map((item) => (
              <div key={item.id} className="flex">
                <button
                  className="flex items-center gap-3 h-10 w-full text-on-surface-variant hover:text-on-surface cursor-pointer"
                  onClick={() => setInstantQuery(item.title)}
                >
                  <HistoryIcon />
                  <span className="text-on-surface">{item.title}</span>
                </button>
                <IconButton
                  onClick={() => handleDeleteSuggestion(item.id)}
                  size="sm"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            {defaultSuggestionList
              .filter(
                (defaultItem) =>
                  !suggestionList.some(
                    (suggestionItem) => suggestionItem.id === defaultItem.id,
                  ),
              )
              .map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-3 h-10 w-full text-on-surface-variant hover:text-on-surface cursor-pointer"
                  onClick={() => {
                    setInstantQuery(item.title);
                  }}
                >
                  <SearchIcon />
                  <span className="text-on-surface">{item.title}</span>
                </button>
              ))}
          </div>
        )}
        {isFirstLoading && <SearchResultSkeleton />}
        {isError && <StatusMessage type="error" />}
        {isReady && !hasMovie && <StatusMessage type="empty" />}
        {isReady && hasMovie && (
          <>
            <div className="grid grid-cols-3 gap-4">
              {searchResults.map((item, index) => (
                <PosterImage
                  key={item.id}
                  id={item.id}
                  index={index}
                  poster_path={item.poster_path}
                  title={item.title}
                  vote_average={item.vote_average}
                  genre_ids={item.genre_ids}
                  onClick={() => handleMovieClick(item.id, item.title)}
                />
              ))}
            </div>
            <div ref={triggerRef} className="my-6">
              <Button
                type="secondary"
                size="lg"
                maxWidth
                onClick={fetchNextPage}
                isDisabled={!hasNextPage}
                isLoading={isFetchingNextPage}
              >
                Load more
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
