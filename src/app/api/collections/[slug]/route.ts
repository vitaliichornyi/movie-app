import { NextRequest, NextResponse } from 'next/server';

import {
  getAllCollectionItemsBySlug,
  getCollectionItemsPageBySlug,
} from '@/src/services/collections';

import { z } from 'zod';
const pathParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters')
    .max(60, 'Slug must not exceed 60 characters'),
});
const queryParamSchema = z.object({
  page: z.coerce
    .number({ message: 'Page must be a valid number' })
    .int('Page number must be an integer')
    .min(0, 'Page number must be at least 0')
    .optional(),
  limit: z.coerce
    .number({ message: 'Limit must be a valid number' })
    .int('Limit number must be an integer')
    .min(10, 'Limit number must be at least 10')
    .optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const pathParamResult = pathParamSchema.safeParse(await params);
  if (!pathParamResult.success) {
    return NextResponse.json(
      { data: null, error: pathParamResult.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { slug } = pathParamResult.data;

  const queryParamObj = Object.fromEntries(request.nextUrl.searchParams);
  const queryResult = queryParamSchema.safeParse(queryParamObj);
  if (!queryResult.success) {
    return NextResponse.json(
      { data: null, error: queryResult.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { page, limit } = queryResult.data;

  const hasPagination = page !== undefined || limit !== undefined;

  if (hasPagination) {
    const currentPage = page ?? 0;
    const currentLimit = limit ?? 10;
    const { data, isLastPage, error } = await getCollectionItemsPageBySlug(
      slug,
      currentPage,
      currentLimit,
    );

    if (error) {
      return NextResponse.json(
        { data: null, isLastPage, error },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { data, isLastPage, error: null },
      { status: 200 },
    );
  } else {
    const { data, error } = await getAllCollectionItemsBySlug(slug);

    if (error) {
      return NextResponse.json({ data: null, error }, { status: 500 });
    }

    return NextResponse.json({ data, error: null }, { status: 200 });
  }
}
