import { ReactNode } from 'react';
import IconButton from './IconButton';
import CloseIcon from '@/src/icons/CloseIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalWindowProps {
  children: ReactNode;
  maxWidth?: string;
  clickOnClose: () => void;
}

export default function ModalWindow({
  children,
  maxWidth = 'max-w-lg',
  clickOnClose,
}: ModalWindowProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={clickOnClose}
        className="fixed top-0 left-0 w-screen h-screen bg-overlay flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative m-2 p-6 w-full ${maxWidth} rounded-3xl bg-surface`}
        >
          <div className="absolute top-6 right-6">
            <IconButton onClick={clickOnClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
