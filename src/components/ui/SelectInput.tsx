import ArrowIcon from '@/src/icons/ArrowIcon';
import { motion } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  selectedValue?: string;
  options: SelectOption[];
  onSelect: (key: any, value: string) => void;
  isActive: string | null;
  setIsActive: () => void;
}

export default function SelectInput({
  id,
  label,
  selectedValue,
  options,
  onSelect,
  isActive,
  setIsActive,
}: SelectInputProps) {
  const hasValue = !!selectedValue;

  function handleSelection(value: string) {
    onSelect(id, value);
    setIsActive();
  }

  const isOpened = id === isActive;

  return (
    <div className="relative">
      <button
        className="flex relative w-full h-14 px-3 rounded-xl bg-secondary hover:bg-secondary-hover transition cursor-pointer"
        type="button"
        onClick={() => setIsActive()}
      >
        <motion.div
          className="absolute top-0 left-3 pointer-events-none"
          initial={false}
          animate={{
            y: hasValue ? 6 : 16,
            scale: hasValue ? 0.75 : 1,
          }}
          style={{ originX: 0, originY: 0 }}
          transition={{ duration: 0.1 }}
        >
          {label}
        </motion.div>
        <motion.div
          className="flex items-center pt-4"
          animate={{ opacity: hasValue ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        >
          {selectedValue}
        </motion.div>
        <motion.div
          animate={{ rotate: isOpened ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute flex items-center h-full right-3"
        >
          <ArrowIcon />
        </motion.div>
      </button>

      {isOpened && (
        <ul className="absolute top-[108%] w-full max-h-68 rounded-xl overflow-y-auto bg-surface z-10">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="flex h-12 w-full items-center px-3 hover:bg-secondary-hover"
                type="button"
                onClick={() => handleSelection(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
