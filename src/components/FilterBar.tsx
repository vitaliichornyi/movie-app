import { useState } from 'react';
import SelectInput from './ui/SelectInput';
import { DiscoverMovieParams } from '../types/movies';

interface SelectorConfig {
  id: keyof DiscoverMovieParams;
  label: string;
  options: { value: string; label: string }[];
}
export const selectorConfig: SelectorConfig[] = [
  {
    id: 'with_origin_country',
    label: 'Country',
    options: [
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'FR', label: 'France' },
      { value: 'DE', label: 'Germany' },
      { value: 'IT', label: 'Italy' },
      { value: 'ES', label: 'Spain' },
      { value: 'KR', label: 'South Korea' },
      { value: 'JP', label: 'Japan' },
      { value: 'UA', label: 'Ukraine' },
    ],
  },
  {
    id: 'with_genres',
    label: 'Genre',
    options: [
      { value: '28', label: 'Action' },
      { value: '12', label: 'Adventure' },
      { value: '16', label: 'Animation' },
      { value: '35', label: 'Comedy' },
      { value: '80', label: 'Crime' },
      { value: '99', label: 'Documentary' },
      { value: '18', label: 'Drama' },
      { value: '10751', label: 'Family' },
      { value: '14', label: 'Fantasy' },
      { value: '36', label: 'History' },
      { value: '27', label: 'Horror' },
      { value: '10402', label: 'Music' },
      { value: '9648', label: 'Mystery' },
      { value: '10749', label: 'Romance' },
      { value: '878', label: 'Science Fiction' },
      { value: '53', label: 'Thriller' },
      { value: '10752', label: 'War' },
      { value: '37', label: 'Western' },
    ],
  },
  {
    id: 'primary_release_year',
    label: 'Release Year',
    options: [
      { value: '2026', label: '2026' },
      { value: '2025', label: '2025' },
      { value: '2024', label: '2024' },
      { value: '2023', label: '2023' },
      { value: '2022', label: '2022' },
      { value: '2021', label: '2021' },
      { value: '2020', label: '2020' },
      { value: '2019', label: '2019' },
      { value: '2018', label: '2018' },
      { value: '2015', label: '2015' },
      { value: '2010', label: '2010' },
    ],
  },
  {
    id: 'vote_average',
    label: 'Rating from',
    options: [
      { value: '8', label: '8' },
      { value: '7', label: '7' },
      { value: '6', label: '6' },
      { value: '5', label: '5' },
      { value: '4', label: '4' },
    ],
  },
];

interface FilterBarProps {
  filters: DiscoverMovieParams;
  onFilterChange: (key: keyof DiscoverMovieParams, value: string) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const [activeSelectId, setActiveSelectId] = useState<
    keyof DiscoverMovieParams | null
  >(null);

  function onToggle(clickedId: keyof DiscoverMovieParams) {
    setActiveSelectId((prevId) => (prevId === clickedId ? null : clickedId));
  }

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 rounded-3xl bg-surface-container">
        {selectorConfig.map((selector) => (
          <SelectInput
            key={selector.id}
            id={selector.id}
            label={selector.label}
            selectedValue={
              selector.options.find(
                (opt) => opt.value === String(filters?.[selector.id] ?? ''),
              )?.label || ''
            }
            options={selector.options}
            onSelect={onFilterChange}
            isActive={activeSelectId}
            setIsActive={() => onToggle(selector.id)}
          />
        ))}
      </div>
    </section>
  );
}
