import { getSimilarMoviesById } from '@/src/services/movies';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';
const pathParamsSchema = z.object({
  id: z.coerce
    .number({ message: 'ID must be a valid number' })
    .int('ID number must be an integer')
    .positive('Movie id must be positive'),
});
const queryParamSchema = z.object({
  page: z.coerce
    .number({ message: 'Page must be a valid number' })
    .int('Page number must be an integer')
    .min(1, 'Page number must be at least 1')
    .default(1),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const pathParams = pathParamsSchema.safeParse(await params);
  if (!pathParams.success) {
    return NextResponse.json(
      { data: null, error: pathParams.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { id } = pathParams.data;

  const queryParamObj = Object.fromEntries(request.nextUrl.searchParams);
  const queryResult = queryParamSchema.safeParse(queryParamObj);
  if (!queryResult.success) {
    return NextResponse.json(
      { data: null, error: queryResult.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { page } = queryResult.data;

  const { data, error } = await getSimilarMoviesById(id, page);
  if (error) {
    return NextResponse.json({ data: null, error }, { status: 500 });
  }
  return NextResponse.json({ data, error: null }, { status: 200 });
}
