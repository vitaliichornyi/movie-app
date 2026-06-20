import { ReactNode } from 'react';
import IconButton from './IconButton';
import CloseIcon from '@/src/icons/CloseIcon';

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
    <div
      onClick={clickOnClose}
      className="fixed top-0 left-0 w-screen h-screen bg-overlay flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative m-2 p-6 w-full ${maxWidth} rounded-3xl bg-surface`}
      >
        <div className="absolute top-6 right-6">
          <IconButton onClick={clickOnClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
