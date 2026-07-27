'use client';

import SearchResultsProvider from '@/src/components/SearchResultsProvider';

export default function Search() {
  return (
    <main className="layout-wrap grow pb-[calc(4rem+env(safe-area-inset-bottom))]">
      <SearchResultsProvider context="page" />
    </main>
  );
}
