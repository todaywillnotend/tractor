import React from "react";

import { tel, clock } from "../../const/data";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer__address">{clock.title}</div>
          <a className="footer__phone" href={tel.href}>
            {tel.title}
          </a>
          {/* TODO: Удалить или исправить */}
          {/* <div className="footer__copyright">
            2021-2023 © Отдел ООО “ТД ВТ” по реализации Т-150 после капитального
            ремонта Капремонт Т-150
          </div> */}
        </div>
        <div className="footer__right">
          <div className="feedback feedback_desktop">
            <FeedbackPopup
              title="Напишите нам"
              subtitle=" "
              className="feedback__popup"
              renderButton={({ openModal }) => (
                <button
                  className="feedback__button"
                  onClick={() => openModal()}
                >
                  Напишите нам
                </button>
              )}
            />
            <FeedbackPopup
              title="Обратный звонок"
              subtitle=" "
              withEmail={false}
              renderButton={({ openModal }) => (
                <button
                  className="feedback__button"
                  onClick={() => openModal()}
                >
                  Обратный звонок
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
