import { AnimatePresence } from 'framer-motion';
import ModalWindow from './ui/ModalWindow';

interface SearchModalProps {
  modalIsOpened: boolean;
  setModalIsOpened: () => void;
}

export default function SearchModal({
  modalIsOpened,
  setModalIsOpened,
}: SearchModalProps) {
  return (
    <AnimatePresence>
      {modalIsOpened && (
        <ModalWindow clickOnClose={setModalIsOpened}>
          This is modal window
        </ModalWindow>
      )}
    </AnimatePresence>
  );
}
