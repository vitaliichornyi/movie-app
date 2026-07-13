import ArrowIcon from '@/src/icons/ArrowIcon';
import { motion } from 'framer-motion';

interface ShowMoreButton {
  isOpened?: boolean;
  onClick: () => void;
}

export default function ShowMoreButton({
  isOpened = false,
  onClick,
}: ShowMoreButton) {
  return (
    <button
      className="flex text-left font-medium text-on-surface-variant hover:text-on-surface transition cursor-pointer"
      onClick={onClick}
    >
      {isOpened ? 'Show less' : 'Show more'}
      <motion.div
        animate={{ rotate: isOpened ? 180 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex items-center justify-center"
      >
        <ArrowIcon />
      </motion.div>
    </button>
  );
}
