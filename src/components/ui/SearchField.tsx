import { useEffect, useRef } from 'react';

import CloseIcon from '@/src/icons/CloseIcon';
import SearchIcon from '@/src/icons/SearchIcon';
import IconButton from './IconButton';
import ClearIcon from '@/src/icons/ClearIcon';

interface SearchFieldProps {
  context: 'modal' | 'page';
  value: string;
  onChange: (value: string) => void;
}

export default function SearchField({
  context,
  value,
  onChange,
}: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFilled = value !== '';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`flex mb-4 ${context === 'modal' ? 'w-[calc(100%-56px)]' : 'w-full'} rounded-2xl text-on-surface-variant bg-secondary`}
    >
      <IconButton onClick={() => inputRef.current?.focus()}>
        <SearchIcon />
      </IconButton>

      <input
        className="flex-1 h-14 text-on-surface placeholder:text-on-surface-variant focus:outline-none"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to search..."
        ref={inputRef}
      />
      {isFilled && (
        <IconButton
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
}
