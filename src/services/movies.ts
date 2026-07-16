import { ServiceResult } from '../types/services';
import {
  DiscoverMovieParams,
  PaginatedResponse,
  Movie,
  MovieExtended,
} from '../types/movies';

export async function getMovies(
  queryParams: DiscoverMovieParams,
): Promise<ServiceResult<PaginatedResponse<Movie>>> {
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
      data: {
        page: data.page,
        results: data.results,
        total_results: data.total_results,
        total_pages: data.total_pages,
      },
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, error: errorMessage };
  }
}

export async function getMovieDetailsById(
  id: number,
): Promise<ServiceResult<MovieExtended>> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,reviews`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}

export async function getSimilarMoviesById(
  movie_id: number,
  page: number,
): Promise<ServiceResult<PaginatedResponse<Movie>>> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}

export async function getRecommendationsByMovieId(
  movie_id: number,
  page: number,
): Promise<ServiceResult<PaginatedResponse<Movie>>> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}

export async function searchMovieByName(
  query: string,
  page: number,
): Promise<ServiceResult<PaginatedResponse<Movie>>> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        data: null,
        error: 'API_KEY is not configured on the server.',
      };
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`,
    );

    if (!response.ok) {
      return {
        data: null,
        error: `Server responded with status ${response.status}`,
      };
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}
