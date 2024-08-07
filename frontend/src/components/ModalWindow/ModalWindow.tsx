import React, { PropsWithChildren, useEffect, useState } from "react";
import Modal from "react-modal";
import cn from "classnames";
// @ts-ignore
import IconClose from "./../../images/icon-close.svg";

import "./ModalWindow.scss";

interface IModalWindow {
  isModalOpen?: boolean;
  setIsModalOpen?: (value: boolean) => void;
  renderButton?: (props: { openModal: () => void }) => React.ReactNode;
  className?: string;
}

export const ModalWindow: React.FC<IModalWindow & PropsWithChildren> = ({
  isModalOpen,
  setIsModalOpen,
  renderButton,
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsModalOpen?.(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsModalOpen?.(false);
    document.body.style.overflow = "unset";
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
          <img src={IconClose} alt="" />
        </button>
        {children}
      </Modal>
    </div>
  );
};
