import {
  CollectionItemsPageResult,
  CollectionItemsResult,
  GetCollectionItemsParams,
} from '../types/collections';
import { Movie } from '../types/movies';

import { createClient } from '../utils/supabase/server';

export async function getCollectionItemsPageBySlug({
  slug,
  page,
  limit,
}: GetCollectionItemsParams): Promise<CollectionItemsPageResult> {
  try {
    const supabase = await createClient();

    const currentPage = page ?? 0;
    const currentLimit = limit ?? 10;

    const from = currentPage * currentLimit;
    const to = from + currentLimit - 1;

    const { data: collection, error } = await supabase
      .from('collections')
      .select(`collection_items ( tmdb_id )`)
      .eq('slug', slug)
      .order('position', { foreignTable: 'collection_items', ascending: true })
      .range(from, to, { foreignTable: 'collection_items' })
      .single();

    if (error) {
      return { data: null, isLastPage: true, error: error.message };
    }

    const tmdbIds = collection.collection_items.map((item) => item.tmdb_id);

    if (tmdbIds.length === 0) {
      return { data: [], isLastPage: true, error: null };
    }

    const movies = await fetchMoviesFromTmdb(tmdbIds);

    const isLastPage = collection.collection_items.length < currentLimit;

    return { data: movies, isLastPage, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, isLastPage: true, error: errorMessage };
  }
}

export async function getAllCollectionItemsBySlug({
  slug,
}: GetCollectionItemsParams): Promise<CollectionItemsResult> {
  try {
    const supabase = await createClient();

    const { data: collection, error } = await supabase
      .from('collections')
      .select(`collection_items ( tmdb_id )`)
      .eq('slug', slug)
      .order('position', { foreignTable: 'collection_items', ascending: true })
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    const tmdbIds = collection.collection_items.map((item) => item.tmdb_id);

    if (tmdbIds.length === 0) {
      return { data: [], error: null };
    }

    const movies = await fetchMoviesFromTmdb(tmdbIds);

    return { data: movies, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, error: errorMessage };
  }
}

async function fetchMoviesFromTmdb(tmdbIds: number[]): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error('API_KEY is not configured on the server.');

  const baseUrl = 'https://api.themoviedb.org/3/movie/';
  const moviePromises = tmdbIds.map((id) =>
    fetch(`${baseUrl}${id}?api_key=${apiKey}&language=en-US`).then((res) => {
      if (!res.ok) return null;
      return res.json();
    }),
  );

  const resolvedMovies = await Promise.all(moviePromises);
  return resolvedMovies.filter(Boolean);
}
