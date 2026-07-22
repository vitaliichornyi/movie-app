'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovieExtended } from '@/src/types/movies';

import LoadingContainer from '@/src/components/LoadingContainer';
import StatusMessage from '@/src/components/StatusMessage';
import HeroImage from '@/src/components/HeroImage';
import RelatedMovies from '@/src/components/RelatedMovies';
import CreditsSlider from '@/src/components/CreditsSlider';
import MovieSummary from '@/src/components/MovieSummary';
import ReviewSlider from '@/src/components/ReviewSlider';
import MovieCollectionGrid from '@/src/components/MovieCollectionGrid';

async function fetchMovieDetailsByID(id: string): Promise<MovieExtended> {
  const response = await fetch(`/api/movies/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }
  const { data } = await response.json();
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

  return (
    <main className="grow">
      <>
        {isLoading && <LoadingContainer />}
        {error && <StatusMessage type="error" />}
        {data && !isLoading && !error && (
          <>
            <HeroImage
              title={data.title}
              backdrop_path={data.backdrop_path}
              releaseDate={data.release_date}
              genres={data.genres}
              vote_average={data.vote_average}
              production_countries={data.production_countries}
            />
            <div className="layout-wrap">
              <RelatedMovies
                movieId={data.id}
                type="recommendations"
                title="Similar movies"
              />
              <RelatedMovies
                movieId={data.id}
                type="similar"
                title="Related movies"
              />
              <CreditsSlider movieId={data.id} title="Cast" />
              <MovieSummary data={data} />
              <ReviewSlider movieId={data.id} title="Reviews" />
            </div>
            <MovieCollectionGrid />
          </>
        )}
      </>
    </main>
  );
}
