export interface GetMoviesParams {
  with_genres?: string;
  with_origin_country?: string;
  primary_release_year?: string;
  vote_average?: number;
  page?: number;
  sort_by?: string;
}

export interface Movie {
  id: number;
  title: string;
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
