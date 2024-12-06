import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import cn from "classnames";

import * as styles from "./Header.module.scss";

import { navigationItems } from "../../const";
import { CART_LOCAL_STORAGE_KEY, tel, mail, whatsapp } from "../../const/data";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { TItem } from "../../types";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";
// @ts-ignore
import ShoppingCart from "./../../images/shopping_cart.svg";
// @ts-ignore
import ShoppingCartDesktop from "./../../images/shopping_cart_desktop.svg";
// @ts-ignore
import WhatsappIcon from "./../../images/icon-whatsapp.svg";

export const Header: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [cart] = useLocalStorageData<TItem[]>(CART_LOCAL_STORAGE_KEY, []);

  const currentPagePath = useMemo(() => {
    if (typeof window !== "undefined") {
      return window?.location?.pathname;
    }
  }, []);

  const toggleBurger = (disableScroll = false) => {
    setIsBurgerOpen((prev) => {
      if (disableScroll) {
        return !prev;
      }

      prev
        ? (document.body.style.overflow = "unset")
        : (document.body.style.overflow = "hidden");

      return !prev;
    });
  };

  return (
    <header className={styles.header}>
      <div
        className={cn(styles.block, styles.top, {
          [styles.topAnimation]: isBurgerOpen,
        })}
      >
        <a className={styles.mail} href={mail.href}>
          {mail.title}
        </a>
        <div className={styles.contactsGroup}>
          <a className={styles.phone} href={tel.href}>
            {tel.title}
          </a>
          <a className={styles.whatsapp} href={whatsapp.href}>
            <img src={WhatsappIcon} alt="" className={styles.whatsappImage} />
            {whatsapp.title}
          </a>
        </div>
        <div className={cn(styles.feedback, styles.feedbackDesktop)}>
          <FeedbackPopup
            title="Напишите нам"
            subtitle=" "
            className={styles.popup}
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
      <div
        className={cn(styles.block, styles.main, {
          [styles.mainAnimation]: isBurgerOpen,
        })}
      >
        <Link
          to="/"
          className={cn(styles.left, {
            [styles.leftAnimation]: isBurgerOpen,
          })}
        >
          <div className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <img src="/logo.png" alt="" className={styles.logoImage} />
            </div>
          </div>
          <div className={styles.text}>
            <span className={styles.title}>ТракторСтрой</span>
            <span className={styles.subtitle}>Продажа сельхозтехники</span>
          </div>
        </Link>
        <div className={styles.middle}>
          <ul className={styles.list}>
            {Object.values(navigationItems).map((item, index) => (
              <li
                key={index}
                className={cn(styles.item, {
                  [styles.itemActive]:
                    currentPagePath === item.href ||
                    currentPagePath === item.href + "/",
                })}
              >
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.right}>
          <Link
            to="/cart"
            className={cn(styles.shoppingCart, {
              [styles.shoppingCartAnimation]: isBurgerOpen,
            })}
          >
            <img
              src={ShoppingCart}
              alt=""
              className={styles.shoppingCartImage}
            />
            <div className={styles.shoppingCartDesktop}>
              <img src={ShoppingCartDesktop} alt="" />
              <span className={styles.shoppingCartText}>Корзина</span>
            </div>
            <div className={styles.shoppingCartCount}>
              {cart.length < 10 ? cart.length : "..."}
            </div>
          </Link>
          <button
            onClick={() => toggleBurger()}
            className={cn(styles.burger, {
              [styles.burgerActive]: isBurgerOpen,
            })}
          >
            <div className={styles.burgerContent}>
              <div className={styles.burgerLine} />
              <div className={styles.burgerLine} />
              <div className={styles.burgerLine} />
            </div>
          </button>
        </div>
      </div>
      <div
        className={cn(styles.bottom, {
          [styles.bottomAnimation]: isBurgerOpen,
        })}
      >
        <div className={styles.feedback}>
          <FeedbackPopup
            title="Напишите нам"
            subtitle=" "
            className={styles.feedbackPopup}
            renderButton={({ openModal }) => (
              <button
                className={styles.feedbackButton}
                onClick={() => {
                  toggleBurger(true);
                  openModal();
                }}
              >
                Напишите нам
              </button>
            )}
          />
          <FeedbackPopup
            title="Обратный звонок"
            subtitle=" "
            withEmail={false}
            className={styles.feedbackPopup}
            renderButton={({ openModal }) => (
              <button
                className={styles.feedbackButton}
                onClick={() => {
                  toggleBurger(true);
                  openModal();
                }}
              >
                Обратный звонок
              </button>
            )}
          />
        </div>
        <ul className={styles.list}>
          {Object.values(navigationItems).map((item, index) => (
            <li
              key={index}
              className={cn(styles.item, {
                [styles.itemActive]:
                  currentPagePath === item.href ||
                  currentPagePath === item.href + "/",
              })}
            >
              <Link
                to={item.href}
                onClick={() => (document.body.style.overflow = "unset")}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
