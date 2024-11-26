import React from "react";
// @ts-ignore
import IconArrow from "./../../images/icon-arrow.svg";
// @ts-ignore
import IconMoney from "./../../images/icon-money.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

import * as styles from "./Leasing.module.scss";

interface ILeasing {
  isLeasingPage?: boolean;
  style?: React.CSSProperties;
}

export const Leasing: React.FC<ILeasing> = ({ style }) => {
  return (
    <section className={styles.leasing} style={style}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <h2 className={styles.title}>лизинговое предложение</h2>
            <p className={styles.subtitle}>Что это?</p>
            <p className={styles.text}>
              Лизинг сельскохозяйственной техники — это удобный и эффективный
              способ обновления парка машин без значительных единовременных
              затрат. Этот финансовый инструмент позволяет аграриям использовать
              современные технологии, такие как тракторы, комбайны и другой
              специальный оборудование, имея возможность расплачиваться за него
              в удобном для себя формате.
            </p>
            <FeedbackPopup
              title="Лизинг"
              subtitle="Отправьте форму и мы свяжемся с Вами в ближайшее время"
              message="Здравствуйте! Хочу связаться с Вами по поводу лизинг предложений"
              renderButton={({ openModal }) => (
                <button className={styles.button} onClick={openModal}>
                  Узнать подробнее
                </button>
              )}
            />
          </div>
          <div className={styles.features}>
            <div className={styles.item}>
              <img src={IconArrow} alt="" className={styles.itemImage} />
              <p className={styles.itemTitle}>Современное оборудование</p>
              <p className={styles.itemSubtitle}>
                Лизинг предоставляет возможность регулярно обновлять парк
                техники, используя новейшие модели и технологии, что
                способствует повышению эффективности работы.
              </p>
            </div>
            <div className={styles.item}>
              <img src={IconMoney} alt="" className={styles.itemImage} />
              <p className={styles.itemTitle}>Минимальные затраты</p>
              <p className={styles.itemSubtitle}>
                Лизинг позволяет избежать крупных единовременных вложений. Вы
                можете начать использовать необходимую технику, не тратя время и
                значительные суммы сразу.
              </p>
            </div>
            <div className={styles.item}>
              <img src={IconMoney} alt="" className={styles.itemImage} />
              <p className={styles.itemTitle}>Возможность выкупа техники</p>
              <p className={styles.itemSubtitle}>
                По окончании срока лизинга многие компании предлагают
                возможность выкупа оборудования по остаточной стоимости, что
                дает фермерам возможность стать владельцами техники.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
