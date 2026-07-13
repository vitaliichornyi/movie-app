export interface DiscoverMovieParams {
  with_genres?: string;
  with_origin_country?: string;
  primary_release_year?: string;
  vote_average?: number;
  page?: number;
  sort_by?: string;
}

export interface Movie {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieExtended extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  budget: number;
  revenue: number;
  runtime: number;
  production_countries: ProductionCountries[];
  credits: Credits;
  spoken_languages: SpokenLanguages[];
  reviews: Reviews;
}

export interface Reviews {
  page: number;
  results: ReviewResults[];
  total_pages: number;
  total_results: number;
}

interface ReviewResults {
  author: string;
  content: string;
  created_at: string;
  id: string;
  author_details: ReviewAuthorDetails;
}

interface ReviewAuthorDetails {
  avatar_path: string;
  name: string;
  rating: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  character: string;
  name: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  department: string;
  job: string;
  profile_path: string | null;
}

interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}
