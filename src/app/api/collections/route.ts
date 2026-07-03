import { NextResponse } from 'next/server';
import getCollections from '@/src/services/getCollections';

export async function GET() {
  const { data, error } = await getCollections();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data });
}
