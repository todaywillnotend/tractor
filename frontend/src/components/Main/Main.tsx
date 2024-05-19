import React from "react";
import { tel } from "../../const/data";

import "./Main.scss";

export const Main: React.FC = () => {
  return (
    <section className="main">
      <div className="main__container">
        <div className="main__content">
          <h1 className="main__title">Трактор ХТЗ Т-150</h1>
          <div className="main__image">
            <img
              srcSet="/tractor-mobile.png 0w, 
             /tractor.png 1440w"
              src="/tractor-mobile.png"
              alt="Трактор ХТЗ Т-150"
            ></img>
          </div>
          <div className="main__block">
            <p className="main__subtitle">
              Не упустите возможность приоберсти доступный и надежный трактор по
              выгодной цене. Свяжитесь с нами сегодня, чтобы получить полную
              информацию для приобретения трактора ХТЗ Т-150. Мы уверены, что вы
              будете впечатлены его качеством и достпуностью.
            </p>
            <a className="main__button" href={tel.href}>
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
