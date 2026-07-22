import { NextRequest, NextResponse } from 'next/server';

import { DiscoverMovieParams } from '@/src/types/movies';
import { getMovies } from '@/src/services/movies';

import { z } from 'zod';
const filterQuerySchema = z.object({
  with_genres: z.string().trim().optional(),
  with_origin_country: z
    .string()
    .trim()
    .length(2, 'Country code must be exactly 2 characters')
    .toUpperCase()
    .optional(),
  primary_release_year: z.coerce
    .number({ message: 'Release year must be a number' })
    .int('Release year must be an integer')
    .optional(),
  vote_average: z.coerce
    .number({ message: 'Vote average must be a number' })
    .min(0, 'Rating cannot be less than 0')
    .max(10, 'Rating cannot exceed 10')
    .optional(),
  page: z.coerce
    .number({ message: 'Page must be a valid number' })
    .int('Page number must be an integer')
    .min(1, 'Page number must be at least 1')
    .optional(),
  sort_by: z.string().trim().optional(),
});

export async function GET(request: NextRequest) {
  const filterQueryObj = Object.fromEntries(request.nextUrl.searchParams);
  const result = filterQuerySchema.safeParse(filterQueryObj);

  if (!result.success) {
    return NextResponse.json(
      { data: null, error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const params: DiscoverMovieParams = result.data;
  const { data, error } = await getMovies(params);

  if (error) {
    return NextResponse.json({ data: null, error }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
