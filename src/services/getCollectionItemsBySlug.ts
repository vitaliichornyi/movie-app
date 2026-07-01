'use server';

import { createClient } from '../utils/supabase/server';

export default async function getCollectionItemsBySlug(slug: string) {
  try {
    const supabase = await createClient();

    const { data: slider, error } = await supabase
      .from('collections')
      .select(
        `title,
        collection_items ( tmdb_id )`,
      )
      .eq('slug', slug)
      .order('position', { foreignTable: 'collection_items', ascending: true })
      .single();

    if (error || !slider) {
      return { data: null, error: `Slider hasn't been found!` };
    }

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return { data: null, error: 'API_KEY is not configured on the server.' };
    }

    const tmdbIds = slider.collection_items.map((item) => item.tmdb_id);

    if (tmdbIds.length === 0) {
      return { data: [], error: null };
    }

    const baseUrl = 'https://api.themoviedb.org/3/movie/';

    const moviePromises = tmdbIds.map((id) =>
      fetch(`${baseUrl}${id}?api_key=${apiKey}&language=en-US`).then((res) => {
        if (!res.ok) return null;
        return res.json();
      }),
    );

    const resolvedMovies = await Promise.all(moviePromises);
    const movies = resolvedMovies.filter(Boolean);

    return { data: movies, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error.';
    return { data: null, error: errorMessage };
  }
}
