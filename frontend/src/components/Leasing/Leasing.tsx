import React from "react";
// @ts-ignore
import IconArrow from "./../../images/icon-arrow.svg";
// @ts-ignore
import IconMoney from "./../../images/icon-money.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

import "./Leasing.scss";

interface ILeasing {
  isLeasingPage?: boolean;
  style?: React.CSSProperties;
}

export const Leasing: React.FC<ILeasing> = ({ style }) => {
  return (
    <section className="leasing" style={style}>
      <div className="leasing__container">
        <div className="leasing__content">
          <div className="leasing__main">
            <h2 className="leasing__title">лизинговое предложение</h2>
            <p className="leasing__subtitle">Что это?</p>
            <p className="leasing__text">
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
                <button className="leasing__button" onClick={openModal}>
                  Узнать подробнее
                </button>
              )}
            />
          </div>
          <div className="leasing__features">
            <div className="leasing__item leasing-item">
              <img src={IconArrow} alt="" className="leasing-item__image" />
              <p className="leasing-item__title">Современное оборудование</p>
              <p className="leasing-item__subtitle">
                Лизинг предоставляет возможность регулярно обновлять парк
                техники, используя новейшие модели и технологии, что
                способствует повышению эффективности работы.
              </p>
            </div>
            <div className="leasing__item leasing-item">
              <img src={IconMoney} alt="" className="leasing-item__image" />
              <p className="leasing-item__title">Минимальные затраты</p>
              <p className="leasing-item__subtitle">
                Лизинг позволяет избежать крупных единовременных вложений. Вы
                можете начать использовать необходимую технику, не тратя время и
                значительные суммы сразу.
              </p>
            </div>
            <div className="leasing__item leasing-item">
              <img src={IconMoney} alt="" className="leasing-item__image" />
              <p className="leasing-item__title">Возможность выкупа техники</p>
              <p className="leasing-item__subtitle">
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
