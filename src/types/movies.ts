export interface GetMoviesParams {
  with_genres?: string;
  with_origin_country?: string;
  primary_release_year?: string;
  vote_average?: number;
  page?: number;
  sort_by?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Cast {
  id: number;
  character: string;
  name: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  job: string;
  name: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Movie {
  id: number;
  title: string;
  genres: Genre[];
  release_date: string;
  runtime_formatted: string;
  age_rating: string;
  vote_average: number;
  credits: Credits;
  overview: string;
  production_countries: ProductionCountry[];
  original_language: string;
  poster_path: string;
  backdrop_path: string;
}

export interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface GetMoviesResult {
  data: GetMoviesResponse | null;
  error: string | null;
}

export interface GetMovieDetailsResponse {
  data: Movie | null;
  error: string | null;
}
