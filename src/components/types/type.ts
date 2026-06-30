export interface DiscoverMovieProps {
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
