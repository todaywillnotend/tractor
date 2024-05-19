import React from "react";
import { Title } from "../Title/Title";

import "./Contacts.scss";
import { clock, mail, tel, time } from "../../const";

const contactsData = [tel, mail, time, clock];

export const Contacts: React.FC = () => {
  return (
    <section className="contacts">
      <div className="contacts__container">
        <Title align="right" text="Контакты" />

        <div className="contacts__content">
          <div className="contacts__texts">
            {contactsData.map((item) => {
              return (
                <div className="contacts__item contacts-item">
                  <div className="contacts-item__top">
                    <div className="contacts-item__image">
                      <img src={item.icon} alt={item.text} />
                    </div>
                    <p className="contacts-item__text">{item.text}</p>
                  </div>
                  <a className="contacts-item__title" href={item.href}>
                    {item.title}
                  </a>
                  <p className="contacts-item__subtitle">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
          <div className="contacts__map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A485d47d0bf289ce1402c84e87d2261387abab8563743c73b78fb7c5cc6d3e8d7&amp;source=constructor"
              width="500"
              height="400"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
