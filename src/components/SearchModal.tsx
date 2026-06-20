import ModalWindow from './ui/ModalWindow';

interface SearchModalProps {
  modalIsOpened: boolean;
  setModalIsOpened: () => void;
}

export default function SearchModal({
  modalIsOpened,
  setModalIsOpened,
}: SearchModalProps) {
  if (!modalIsOpened) {
    return;
  }

  return (
    <ModalWindow clickOnClose={setModalIsOpened}>
      This is modal window
    </ModalWindow>
  );
}
