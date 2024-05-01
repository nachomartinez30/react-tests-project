import React, { createContext, useMemo, useState } from "react";

import { Button, Modal } from "react-bootstrap";

interface ModalContextValue {
  showModal: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  createModal: (modalProps: ModalCreateProps) => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

interface ModalCreateProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  content: JSX.Element;
  handleConfirm: () => void;
}

// Create a provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<ModalCreateProps>();
  const createModal = (modalProps: ModalCreateProps) =>
    setModalProps(modalProps);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const contextValue = useMemo(
    () => ({
      showModal,
      handleClose,
      handleOpen,
      createModal,
    }),
    [showModal, handleClose, handleOpen, createModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalProps?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalProps?.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {modalProps?.cancelButtonText}
          </Button>
          <Button variant="primary" onClick={modalProps?.handleConfirm}>
            {modalProps?.confirmButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
