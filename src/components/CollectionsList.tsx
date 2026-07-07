'use client';

import { useQuery } from '@tanstack/react-query';

import { GetCollectionsResult } from '@/src/types/collections';

import CollectionItem from './ui/CollectionItem';
import StatusMessage from './ui/StatusMessage';
import LoadingContainer from './ui/LoadingContainer';

async function fetchCollections(): Promise<GetCollectionsResult> {
  const response = await fetch('/api/collections');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const data = await response.json();

  return data;
}

export default function CollectionsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,

    staleTime: Infinity,
    gcTime: Infinity,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const collections = data?.data || [];

  const hasData = collections && collections.length > 0;
  const isReady = !isLoading && !error;

  return (
    <div className="layout-wrap flex flex-col gap-8 mt-6">
      {isLoading && <LoadingContainer />}
      {error && <StatusMessage type="error" />}
      {isReady && !hasData && <StatusMessage type="empty" />}

      {isReady && hasData && (
        <>
          {collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              slug={collection.slug}
              title={collection.title}
            />
          ))}
        </>
      )}
    </div>
  );
}
