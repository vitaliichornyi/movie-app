'use client';
import { useQuery } from '@tanstack/react-query';
import { Collection } from '../types/collections';
import LoadingContainer from './LoadingContainer';
import MovieCollection from './MovieCollection';

async function fetchCollections(): Promise<Collection[]> {
  const response = await fetch('/api/collections');
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }

  return data;
}

export default function MovieCollectionGrid() {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const hasData = data && data.length > 0;
  const shouldHide = isError || (isSuccess && !hasData);

  if (shouldHide) {
    return null;
  }

  return (
    <>
      {isPending && <LoadingContainer />}
      {hasData && (
        <div className="layout-wrap">
          {data.map((collection) => (
            <MovieCollection
              key={collection.id}
              slug={collection.slug}
              title={collection.title}
            />
          ))}
        </div>
      )}
    </>
  );
}
