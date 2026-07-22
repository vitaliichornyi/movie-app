import { NextRequest, NextResponse } from 'next/server';
import { getMovieDetailsById } from '@/src/services/movies';

import { z } from 'zod';
const pathParamSchema = z.object({
  id: z.coerce
    .number({ message: 'ID must be a valid number' })
    .int('ID number must be an integer')
    .positive('Movie id must be positive'),
});

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const result = pathParamSchema.safeParse(await params);
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { id } = result.data;

  const { data, error } = await getMovieDetailsById(id);
  if (error) {
    const isNotFound = error.includes('404');
    return NextResponse.json(
      { data: null, error },
      { status: isNotFound ? 404 : 500 },
    );
  }

  return NextResponse.json({ data, error: null }, { status: 200 });
}
