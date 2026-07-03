import { createClient } from '../utils/supabase/server';
import { GetCollectionsResult } from '../components/types/collections';

export default async function getCollections(): Promise<GetCollectionsResult> {
  try {
    const supabase = await createClient();

    const { data: collections, error } = await supabase
      .from('collections')
      .select('*')
      .eq('section', 'home-page')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: collections, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown server error';
    return { data: null, error: errorMessage };
  }
}
