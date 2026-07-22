import { searchMovieByName } from '@/src/services/movies';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

const searchQuerySchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Search query must be at least 2 characters')
    .max(60, 'Search query must not exceed 60 characters'),
  pageParam: z.coerce
    .number({ message: 'Page must be a valid number' })
    .int('Page number must be an integer')
    .min(1, 'Page number must be at least 1')
    .default(1),
});

export async function GET(request: NextRequest) {
  const searchQueryObj = Object.fromEntries(request.nextUrl.searchParams);
  const result = searchQuerySchema.safeParse(searchQueryObj);

  if (!result.success) {
    return NextResponse.json(
      { data: null, error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { query, pageParam } = result.data;
  const { data, error } = await searchMovieByName(query, pageParam);

  if (error) {
    return NextResponse.json({ data: null, error }, { status: 500 });
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
