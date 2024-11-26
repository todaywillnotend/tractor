import React from "react";

import { tel, clock } from "../../const/data";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

import * as styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.address}>{clock.title}</div>
          <a className={styles.phone} href={tel.href}>
            {tel.title}
          </a>
          {/* TODO: Удалить или исправить */}
          {/* <div className="footer__copyright">
            2021-2023 © Отдел ООО “ТД ВТ” по реализации Т-150 после капитального
            ремонта Капремонт Т-150
          </div> */}
        </div>
        <div className={styles.right}>
          <div className={styles.feedback}>
            <FeedbackPopup
              title="Напишите нам"
              subtitle=" "
              className={styles.feedbackPopup}
              renderButton={({ openModal }) => (
                <button
                  className={styles.feedbackButton}
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
                  className={styles.feedbackButton}
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
