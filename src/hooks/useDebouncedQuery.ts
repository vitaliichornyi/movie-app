import { useEffect, useState } from 'react';

export default function useDebouncedQuery() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (inputValue.trim().length < 2) {
      setDebouncedQuery('');
      return;
    }
    const delayDebounce = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [inputValue]);

  return { inputValue, setInputValue, debouncedQuery };
}
