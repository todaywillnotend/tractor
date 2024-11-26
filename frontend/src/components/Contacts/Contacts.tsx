import React from "react";
import { Title } from "../Title/Title";

import * as styles from "./Contacts.module.scss";
import { clock, mail, tel, time } from "../../const";

const contactsData = [tel, mail, time, clock];

export const Contacts: React.FC = () => {
  return (
    <section className={styles.contacts}>
      <div className={styles.container}>
        <Title align="right" text="Контакты" />

        <div className={styles.content}>
          <div className={styles.texts}>
            {contactsData.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.itemTop}>
                    <div className={styles.itemImage}>
                      <img src={item.icon} alt={item.text} />
                    </div>
                    <p className={styles.itemText}>{item.text}</p>
                  </div>
                  <a className={styles.itemTitle} href={item.href}>
                    {item.title}
                  </a>
                  <p className={styles.itemSubtitle}>{item.subtitle}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.map}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A485d47d0bf289ce1402c84e87d2261387abab8563743c73b78fb7c5cc6d3e8d7&amp;source=constructor"
              width="500"
              height="400"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
