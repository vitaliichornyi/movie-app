'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { GetMovieDetailsResponse } from '@/src/components/types/movies';

import Breadcrumbs from '@/src/components/ui/Breadcrumbs';
import LoadingContainer from '@/src/components/ui/LoadingContainer';
import StatusMessage from '@/src/components/ui/StatusMessage';

async function fetchMovieDetailsByID(
  id: string,
): Promise<GetMovieDetailsResponse> {
  const response = await fetch(`/api/movies/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  const data = await response.json();

  return data;
}

export default function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetailsByID(id),
  });

  const movieDetails = data?.data;

  return (
    <div className="layout-wrap">
      {isLoading && <LoadingContainer />}

      {error && <StatusMessage type="error" />}

      {!isLoading && !error && (
        <>
          <Breadcrumbs dynamicTitle={movieDetails?.title} />
          <article>
            <h1>{movieDetails?.title}</h1>
          </article>
        </>
      )}
    </div>
  );
}
