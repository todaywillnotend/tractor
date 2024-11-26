import React from "react";
import { tel } from "../../const/data";

import * as styles from "./Main.module.scss";

export const Main: React.FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Трактор ХТЗ Т-150</h1>
          <div className={styles.image}>
            <img
              srcSet="/tractor-mobile.png 0w, 
             /tractor.png 1440w"
              src="/tractor-mobile.png"
              alt="Трактор ХТЗ Т-150"
            />
          </div>
          <div className={styles.block}>
            <p className={styles.subtitle}>
              Не упустите возможность приобрести доступный и надежный трактор по
              выгодной цене. Свяжитесь с нами сегодня, чтобы получить полную
              информацию для приобретения трактора ХТЗ Т-150. Мы уверены, что вы
              будете впечатлены его качеством и доступностью.
            </p>
            <a className={styles.button} href={tel.href}>
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
