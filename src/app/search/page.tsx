'use client';

import SearchResultsProvider from '@/src/components/SearchResultsProvider';

export default function Search() {
  return (
    <main className="layout-wrap">
      <SearchResultsProvider context="page" />
    </main>
  );
}
