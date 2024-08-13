import React, { useState } from "react";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Form } from "../Form/Form";

import "./FeedbackPopup.scss";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { SHOW_PRICE_LOCAL_STORAGE_KEY } from "../../const";

interface IFeedbackPopup {
  title?: string;
  subtitle?: string;
  message?: string;
  withEmail?: boolean;
  renderButton?: (props: { openModal: () => void }) => React.ReactNode;
  className?: string;
}

export const FeedbackPopup: React.FC<IFeedbackPopup> = ({
  renderButton,
  className,
  title,
  subtitle,
  message,
  withEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [showPriceId, _setShowPriceId] = useLocalStorageData<
    number | undefined
  >(SHOW_PRICE_LOCAL_STORAGE_KEY, undefined);

  return (
    <ModalWindow
      renderButton={renderButton}
      className={className}
      isModalOpen={isOpen}
      setIsModalOpen={(value) => setIsOpen(value)}
    >
      <div className="feedback-popup">
        <Form
          message={message}
          withEmail={withEmail}
          title={title}
          subtitle={subtitle}
          withMessage
          cart={showPriceId ? [showPriceId] : []}
        />
      </div>
    </ModalWindow>
  );
};
