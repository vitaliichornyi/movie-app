'use client';

import { useState } from 'react';
import SearchIcon from '@/src/icons/SearchIcon';
import SearchModal from '../SearchModal';

export default function SearchButton() {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  return (
    <>
      <button
        className="flex items-center gap-2 w-52 h-10 px-2 rounded-xl text-on-secondary bg-secondary hover:bg-secondary-hover transition cursor-pointer"
        onClick={() => setModalIsOpened(!modalIsOpened)}
      >
        <SearchIcon />
        Search...
      </button>
      <SearchModal
        modalIsOpened={modalIsOpened}
        setModalIsOpened={() => setModalIsOpened(!modalIsOpened)}
      />
    </>
  );
}
