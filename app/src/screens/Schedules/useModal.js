// useModal.js
import { useState } from "react";

const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
