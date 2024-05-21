import React, { PropsWithChildren, useEffect, useState } from "react";
import Modal from "react-modal";
import cn from "classnames";

import "./ModalWindow.scss";

interface IModalWindow {
  isModalOpen?: boolean;
  setIsModalOpen?: (value: boolean) => void;
  renderButton?: (props: { openModal: () => void }) => React.ReactNode;
  className?: string;
}

export const ModalWindow: React.FC<IModalWindow & PropsWithChildren> = ({
  isModalOpen = false,
  setIsModalOpen,
  renderButton,
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
    setIsModalOpen?.(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
    setIsModalOpen?.(false);
  };

  return (
    <div className={cn("modal-window", className)}>
      {renderButton ? (
        renderButton({ openModal })
      ) : (
        <button onClick={openModal}>Open Modal</button>
      )}
      <Modal
        className="modal-window__modal"
        overlayClassName="modal-window__overlay"
        isOpen={isModalOpen !== undefined ? isModalOpen : isOpen}
        onRequestClose={closeModal}
      >
        <button onClick={closeModal} className="modal-window__close">
          <img src="/icon-close.svg" alt="" />
        </button>
        {children}
      </Modal>
    </div>
  );
};
