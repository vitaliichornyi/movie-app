'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import LoadingContainer from '@/src/components/LoadingContainer';
import StatusMessage from '@/src/components/StatusMessage';
import Tag from '@/src/components/ui/Tag';
import CrewSlider from '@/src/components/CrewSlider';

import { MovieExtended } from '@/src/types/movies';
import DetailsListRow from '@/src/components/ui/DetailsListRow';
import RatingWidget from '@/src/components/RatingWidget';
import ShowMoreButton from '@/src/components/ui/ShowMoreButton';
import ReviewSlider from '@/src/components/ReviewSlider';
import RelatedMovies from '@/src/components/RelatedMovies';
import MovieCollectionGrid from '@/src/components/MovieCollectionGrid';
import Headline from '@/src/components/ui/Headline';
import HeroImage from '@/src/components/HeroImage';

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

  const [isOpened, setIsOpened] = useState(false);

  return (
    <main>
      <>
        {isLoading && <LoadingContainer />}
        {error && <StatusMessage type="error" />}
        {data && !isLoading && !error && (
          <>
            <HeroImage
              title={data.title}
              backdrop_path={data.backdrop_path}
              releaseYear={data.release_date && data.release_date.split('-')[0]}
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
              <section>
                <Headline as="h2" variant="h2">
                  Cast
                </Headline>
                <CrewSlider cast={data.credits.cast} />
              </section>
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-8 flex-col gap-2">
                    <div className="w-full md:max-w-170">
                      <Headline as="h2" variant="h2">
                        Overview
                      </Headline>
                      <p>{data.overview}</p>
                    </div>
                    {isOpened && (
                      <dl className="pt-4 pb-2">
                        <DetailsListRow label="Director">
                          {data.credits.crew
                            .filter(
                              (person) =>
                                person.department === 'Directing' &&
                                person.job === 'Director',
                            )
                            .map((person, index) => (
                              <React.Fragment key={person.id}>
                                {index > 0 && <span>·</span>}
                                <span>{person.name}</span>
                              </React.Fragment>
                            ))}
                        </DetailsListRow>
                        <DetailsListRow label="Genres">
                          {data.genres.map((genre, index) => (
                            <React.Fragment key={genre.id}>
                              {index > 0 && <span>·</span>}
                              <span>{genre.name}</span>
                            </React.Fragment>
                          ))}
                        </DetailsListRow>
                        {data.release_date && (
                          <DetailsListRow label="Release date">
                            {new Date(
                              data.release_date.replace(/-/g, '/'),
                            ).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </DetailsListRow>
                        )}
                        <DetailsListRow label="Country">
                          {data.production_countries
                            .slice(0, 2)
                            .map((country) => (
                              <Tag
                                key={country.iso_3166_1}
                                isoCode={country.iso_3166_1}
                              >
                                {country.name}
                              </Tag>
                            ))}
                        </DetailsListRow>
                        <DetailsListRow label="Budget">{`$${Intl.NumberFormat('en-US').format(data.budget)}`}</DetailsListRow>
                        <DetailsListRow label="Revenue">{`$${Intl.NumberFormat('en-US').format(data.revenue)}`}</DetailsListRow>

                        <DetailsListRow label="Runtime">{`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}</DetailsListRow>
                        <DetailsListRow label="Language">
                          {data.spoken_languages.map((language, index) => (
                            <React.Fragment key={language.iso_639_1}>
                              {index > 0 && <span>·</span>}
                              <span>{language.name}</span>
                            </React.Fragment>
                          ))}
                        </DetailsListRow>
                      </dl>
                    )}
                    <ShowMoreButton
                      isOpened={isOpened}
                      onClick={() => setIsOpened(!isOpened)}
                    />
                  </div>
                  <div className="flex flex-4 flex-col pt-0 md:pt-14">
                    <RatingWidget
                      voteCount={Intl.NumberFormat('en-US').format(
                        data.vote_count,
                      )}
                      voteAverage={data.vote_average.toFixed(1)}
                    />
                  </div>
                </div>
              </section>
              {data.reviews.results.length > 0 && (
                <ReviewSlider reviews={data.reviews} />
              )}
            </div>
          </>
        )}
        <MovieCollectionGrid />
      </>
    </main>
  );
}
