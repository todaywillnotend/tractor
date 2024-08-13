import React, { useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { Link } from "gatsby";

import { Title } from "../Title/Title";
import { formatPrice } from "../../utils";
import { CommonContext } from "../../context/CommonContext";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { CART_LOCAL_STORAGE_KEY } from "../../const";
// @ts-ignore
import IconTrash from "./../../images/icon-trash.svg";
import { Form } from "../Form/Form";

import "./Cart.scss";

enum ECartStep {
  INIT = "INIT",
  CART = "CART",
  FORM = "FORM",
}

export const Cart: React.FC = () => {
  const catalog = useContext(CommonContext)?.state?.catalog || [];

  const [step, setStep] = useState<ECartStep>(ECartStep.INIT);

  const [cart, setCart] = useLocalStorageData<number[]>(
    CART_LOCAL_STORAGE_KEY,
    []
  );

  const cartItems = useMemo(() => {
    return catalog.filter((item) => cart.includes(item.id));
  }, [cart, catalog]);

  const cartAmount = useMemo(() => {
    return formatPrice(
      cartItems.reduce((acc, cur) => {
        if (!cur.price) {
          return acc;
        }

        return acc + cur.price;
      }, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    if (step !== ECartStep.FORM) {
      if (!cart.length) {
        setStep(ECartStep.INIT);
      } else {
        setStep(ECartStep.CART);
      }
    }
  }, [cart]);

  const onFormSend = () => {
    setCart([]);
  };

  return (
    <section className="cart">
      <Title text="Корзина" align="center" />
      {step === ECartStep.INIT && (
        <div className="cart-empty">
          <h3 className="cart-empty__title">Тут пока пусто :(</h3>
          <img
            className="cart-empty__image"
            src="/empty.jpg"
            alt="Корзина пуста"
          />
        </div>
      )}
      {step === ECartStep.CART && (
        <div className="cart__container">
          <div className="cart-result">
            <p className="cart-result__title">Итог: {cartAmount}</p>
            <button
              className="cart-result__button"
              onClick={() => setStep(ECartStep.FORM)}
            >
              Продолжить
            </button>
          </div>
          <div className="catalog__items">
            {(cartItems || []).map((item) => {
              const idAddedElement = cart.includes(item.id);

              return (
                <div className="catalog__item catalog-item">
                  <button
                    className="button-trash"
                    onClick={() => setCart(cart.filter((el) => el !== item.id))}
                  >
                    <img src={IconTrash} alt="" />
                  </button>
                  <Link
                    to={`/catalog/${item.id}`}
                    className="catalog-item__image"
                  >
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <div className="catalog-item__container">
                    <Link
                      to={`/catalog/${item.id}`}
                      className="catalog-item__title"
                    >
                      {item.title}
                    </Link>
                    <div className="catalog-item__price">
                      {item.last_price && (
                        <div className="catalog-item__price_old">
                          {formatPrice(item.last_price)}
                        </div>
                      )}
                      {item.price && (
                        <div className="catalog-item__price_new">
                          {formatPrice(item.price)}
                        </div>
                      )}
                    </div>
                    <button
                      className={cn("catalog-item__button", {
                        "catalog-item__button_added": idAddedElement,
                      })}
                      disabled
                    >
                      1
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {step === ECartStep.FORM && (
        <div className="cart__form">
          <Form cart={cart} title="" subtitle="" onSuccess={onFormSend} />
        </div>
      )}
    </section>
  );
};
