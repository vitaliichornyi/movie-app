'use server';

interface DiscoverMovieParams {
  with_genres?: string;
  with_origin_country?: string;
  primary_release_year?: string;
  vote_average?: number;
  page?: number;
  sort_by?: string;
}

export default async function getMovies(queryParams: DiscoverMovieParams) {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return { data: null, error: 'API_KEY is not configured on the server.' };
    }

    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    const searchParams = new URLSearchParams({
      api_key: apiKey,
      language: 'en-US',
    });

    if (queryParams.with_genres)
      searchParams.append('with_genres', queryParams.with_genres);
    if (queryParams.with_origin_country)
      searchParams.append(
        'with_origin_country',
        queryParams.with_origin_country,
      );
    if (queryParams.primary_release_year)
      searchParams.append(
        'primary_release_year',
        queryParams.primary_release_year,
      );
    if (queryParams.vote_average)
      searchParams.append(
        'vote_average.gte',
        queryParams.vote_average.toString(),
      );
    if (queryParams.page)
      searchParams.append('page', queryParams.page.toString());
    if (queryParams.sort_by)
      searchParams.append('sort_by', queryParams.sort_by);

    const url = `${baseUrl}?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();

    return {
      data: { movies: data.results, totalPages: data.total_pages },
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, error: errorMessage };
  }
}
