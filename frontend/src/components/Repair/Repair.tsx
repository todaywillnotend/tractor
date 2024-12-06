import React from "react";
// @ts-ignore
import IconArrow from "./../../images/icon-arrow.svg";
// @ts-ignore
import IconMoney from "./../../images/icon-money.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

import * as styles from "./Repair.module.scss";

interface IRepair {
  isLeasingPage?: boolean;
  style?: React.CSSProperties;
}

export const Repair: React.FC<IRepair> = ({ style }) => {
  return (
    <section className={styles.repair} style={style}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Капитальный ремонт</h2>
          <p className={styles.text}>
            Обращайтесь к нашим специалистам для качественного восстановления
            техники. Мы гарантируем эффективное решение любых проблем и
            продлеваем срок службы ваших машин!
          </p>

          <FeedbackPopup
            title="Капитальный ремонт"
            subtitle="Отправьте форму и мы свяжемся с Вами в ближайшее время"
            message="Здравствуйте! Хочу связаться с Вами по поводу капитального ремонта"
            renderButton={({ openModal }) => (
              <button className={styles.button} onClick={openModal}>
                Узнать подробнее
              </button>
            )}
          />
        </div>
      </div>
    </section>
  );
};
