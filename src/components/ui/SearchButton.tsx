'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import SearchIcon from '@/src/icons/SearchIcon';

import ModalWindow from '../ModalWindow';
import SearchResultsProvider from '../SearchResultsProvider';

export default function SearchButton() {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setModalIsOpened(false);
  }, [pathname]);

  return (
    <>
      <button
        className="flex items-center gap-2 w-52 h-10 px-2 rounded-xl text-on-secondary bg-secondary hover:bg-secondary-hover backdrop-blur-xs transition cursor-pointer"
        onClick={() => setModalIsOpened(!modalIsOpened)}
      >
        <SearchIcon />
        Search...
      </button>
      {modalIsOpened && (
        <ModalWindow clickOnClose={() => setModalIsOpened(!modalIsOpened)}>
          <SearchResultsProvider context="modal" />
        </ModalWindow>
      )}
    </>
  );
}
