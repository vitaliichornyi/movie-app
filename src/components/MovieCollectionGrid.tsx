'use client';
import { useQuery } from '@tanstack/react-query';

import LoadingContainer from './ui/LoadingContainer';
import StatusMessage from './ui/StatusMessage';
import MovieCollection from './MovieCollection';

import { Collection } from '../types/collections';

async function fetchCollections(): Promise<Collection[]> {
  const response = await fetch('/api/collections');
  const { data, error } = await response.json();

  if (!response.ok) {
    throw new Error(error || 'Unknown error');
  }

  return data;
}

export default function MovieCollectionGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const hasData = data && data.length > 0;
  const isReady = !isLoading && !error;

  return (
    <div className="layout-wrap flex flex-col gap-8 mt-6">
      {isLoading && <LoadingContainer />}
      {error && <StatusMessage type="error" />}
      {isReady && !hasData && <StatusMessage type="empty" />}

      {isReady &&
        hasData &&
        data.map((collection) => (
          <MovieCollection
            key={collection.id}
            slug={collection.slug}
            title={collection.title}
          />
        ))}
    </div>
  );
}
