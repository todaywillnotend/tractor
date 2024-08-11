import React, { useState } from "react";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Form } from "../Form/Form";

import "./FeedbackPopup.scss";

interface IFeedbackPopup {
  title?: string;
  subtitle?: string;
  withEmail?: boolean;
  renderButton?: (props: { openModal: () => void }) => React.ReactNode;
  className?: string;
}

export const FeedbackPopup: React.FC<IFeedbackPopup> = ({
  renderButton,
  className,
  title,
  subtitle,
  withEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalWindow
      renderButton={renderButton}
      className={className}
      isModalOpen={isOpen}
      setIsModalOpen={(value) => setIsOpen(value)}
    >
      <div className="feedback-popup">
        <Form
          withEmail={withEmail}
          title={title}
          subtitle={subtitle}
          withMessage
        />
      </div>
    </ModalWindow>
  );
};
