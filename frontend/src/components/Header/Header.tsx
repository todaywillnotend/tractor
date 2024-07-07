import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import cn from "classnames";

import "./Header.scss";

import { navigationItems } from "../../const";
import { CART_LOCAL_STORAGE_KEY, tel } from "../../const/data";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { TItem } from "../../types";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";
// @ts-ignore
import ShoppingCart from "./../../images/shopping_cart.svg";
// @ts-ignore
import ShoppingCartDesktop from "./../../images/shopping_cart_desktop.svg";

export const Header: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const [cart] = useLocalStorageData<TItem[]>(CART_LOCAL_STORAGE_KEY, []);

  const currentPagePath = useMemo(() => {
    if (typeof window !== "undefined") {
      return window?.location?.pathname;
    }
  }, [window]);

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
          <FeedbackPopup
            title="Напишите нам"
            subtitle=" "
            className="feedback__popup"
            renderButton={({ openModal }) => (
              <button className="feedback__button" onClick={() => openModal()}>
                Напишите нам
              </button>
            )}
          />
          <FeedbackPopup
            title="Обратный звонок"
            subtitle=" "
            withEmail={false}
            renderButton={({ openModal }) => (
              <button className="feedback__button" onClick={() => openModal()}>
                Обратный звонок
              </button>
            )}
          />
        </div>
      </div>
      <div
        className={cn("header__block header__main", {
          header__main_animation: isBurgerOpen,
        })}
      >
        <Link
          to="/"
          className={cn("header__left", {
            header__left_animation: isBurgerOpen,
          })}
        >
          <div className="header__logo logo">
            <div className="logo__image_wrapper">
              <img src="/logo.png" alt="" className="logo__image" />
            </div>
          </div>
          <div className="header__text">
            <span className="header__title">T-150</span>
            <span className="header__subtitle">Ремонт техники</span>
          </div>
        </Link>
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
          <Link
            to="/cart"
            className={cn("header__shopping-cart shopping-cart", {
              "shopping-cart_animation": isBurgerOpen,
            })}
          >
            <img src={ShoppingCart} alt="" className="shopping-cart__image" />
            <div className="shopping-cart__desktop">
              <img src={ShoppingCartDesktop} alt="" />
              <span className="shopping-cart__text">Корзина</span>
            </div>
            <div className="shopping-cart__count">
              {cart.length < 10 ? cart.length : "..."}
            </div>
          </Link>
          <button
            onClick={() => {
              setIsBurgerOpen((prev) => {
                prev
                  ? (document.body.style.overflow = "unset")
                  : (document.body.style.overflow = "hidden");

                return !prev;
              });
            }}
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
          <FeedbackPopup
            title="Напишите нам"
            subtitle=" "
            className="feedback__popup"
            renderButton={({ openModal }) => (
              <button className="feedback__button" onClick={() => openModal()}>
                Напишите нам
              </button>
            )}
          />
          <FeedbackPopup
            title="Обратный звонок"
            subtitle=" "
            withEmail={false}
            className="feedback__popup"
            renderButton={({ openModal }) => (
              <button className="feedback__button" onClick={() => openModal()}>
                Обратный звонок
              </button>
            )}
          />
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
