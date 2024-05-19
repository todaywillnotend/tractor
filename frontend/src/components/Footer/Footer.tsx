import React from "react";

import { tel } from "../../const/data";

import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer__address">
            г. Волжский, ул 6-ая Автодорога, д. 22, офис 10
          </div>
          <a className="footer__phone" href={tel.href}>
            {tel.title}
          </a>
          <div className="footer__copyright">
            2021-2023 © Отдел ООО “ТД ВТ” по реализации Т-150 после капитального
            ремонта Капремонт Т-150
          </div>
        </div>
        <div className="footer__tight">
          <div className="feedback feedback_desktop">
            <button className="feedback__button">Напишите нам</button>
            <button className="feedback__button">Обратный звонок</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
