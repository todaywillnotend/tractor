import React, { PropsWithChildren, useEffect, useState } from "react";
import Modal from "react-modal";
import cn from "classnames";
// @ts-ignore
import IconClose from "./../../images/icon-close.svg";

import * as styles from "./ModalWindow.module.scss";

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
    <div className={cn(styles.wrapper, className)}>
      {renderButton ? (
        renderButton({ openModal })
      ) : (
        <button onClick={openModal}>Open Modal</button>
      )}
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={isModalOpen !== undefined ? isModalOpen : isOpen}
        onRequestClose={closeModal}
      >
        <button onClick={closeModal} className={styles.close}>
          <img src={IconClose} alt="" />
        </button>
        {children}
      </Modal>
    </div>
  );
};
