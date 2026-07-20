import { useEffect, useState, useRef } from 'react';

export default function useDebouncedQuery() {
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (inputValue.trim().length < 2) {
      setDebouncedQuery('');
      return;
    }
    timeoutRef.current = window.setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue]);

  const setInstantQuery = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setInputValue(value);
    setDebouncedQuery(value);
  };

  return { inputValue, setInputValue, debouncedQuery, setInstantQuery };
}
