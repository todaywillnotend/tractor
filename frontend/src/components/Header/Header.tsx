import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import cn from "classnames";

import "./Header.scss";

import { navigationItems } from "../../const";
import { CART_LOCAL_STORAGE_KEY, tel } from "../../const/data";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { TItem } from "../../types";

export const Header: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [cart] = useLocalStorageData<TItem[]>(CART_LOCAL_STORAGE_KEY, []);

  const currentPagePath = useMemo(() => {
    return window.location.pathname;
  }, []);

  return (
    <header className="header">
      <div
        className={cn("header__block header__top", {
          header__top_animation: isBurgerOpen,
        })}
      >
        <div className="header__address">
          г. Волжский, ул 6-ая Автодорога, д. 22, офис 10
        </div>
        <a className="header__phone" href={tel.href}>
          {tel.title}
        </a>
        <div className="feedback feedback_desktop">
          <button className="feedback__button">Напишите нам</button>
          <button className="feedback__button">Обратный звонок</button>
        </div>
      </div>
      <div
        className={cn("header__block header__main", {
          header__main_animation: isBurgerOpen,
        })}
      >
        <div className="header__left">
          <div className="header__logo logo">
            <div className="logo__image_wrapper">
              <img src="/logo.png" alt="" className="logo__image" />
            </div>
          </div>
          <div className="header__text">
            <span className="header__title">T-150</span>
            <span className="header__subtitle">Ремонт техники</span>
          </div>
        </div>
        <div className="header__middle">
          <ul className="header__list">
            {Object.values(navigationItems).map((item) => (
              <li
                className={cn("header__item", {
                  header__item_active:
                    currentPagePath === item.href ||
                    currentPagePath === item.href + "/",
                })}
              >
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="header__right">
          <button
            className={cn("header__shopping-cart shopping-cart", {
              "shopping-cart_animation": isBurgerOpen,
            })}
          >
            <img
              src="/shopping_cart.svg"
              alt=""
              className="shopping-cart__image"
            />
            <div className="shopping-cart__desktop">
              <img src="/shopping_cart_desktop.svg" alt="" />
              <span className="shopping-cart__text">Корзина</span>
            </div>
            <div className="shopping-cart__count">
              {cart.length < 10 ? cart.length : "..."}
            </div>
          </button>
          <button
            onClick={() =>
              setIsBurgerOpen((prev) => {
                prev
                  ? (document.documentElement.style.overflow = "unset")
                  : (document.documentElement.style.overflow = "hidden");
                return !prev;
              })
            }
            className={cn("header__burger burger", {
              burger_active: isBurgerOpen,
            })}
          >
            <div className="burger__content">
              <div className="burger__line" />
              <div className="burger__line" />
              <div className="burger__line" />
            </div>
          </button>
        </div>
      </div>
      <div
        className={cn("header__bottom", {
          header__bottom_animation: isBurgerOpen,
        })}
      >
        <div className="feedback">
          <button className="feedback__button">Напишите нам</button>
          <button className="feedback__button">Обратный звонок</button>
        </div>
        <ul className="header__list">
          {Object.values(navigationItems).map((item) => (
            <li
              className={cn("header__item", {
                header__item_active:
                  currentPagePath === item.href ||
                  currentPagePath === item.href + "/",
              })}
            >
              <Link to={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
