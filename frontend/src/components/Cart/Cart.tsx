import React, { useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { Title } from "../Title/Title";
import { formatPrice } from "../../utils";
import { CommonContext } from "../../context/CommonContext";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { CART_LOCAL_STORAGE_KEY } from "../../const";

import "./Cart.scss";
import { Form } from "../Form/Form";

enum ECartStep {
  INIT = "INIT",
  CART = "CART",
  FORM = "FORM",
}

export const Cart: React.FC = () => {
  const {
    state: { catalog },
  } = useContext(CommonContext);

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
                    <img src="/icon-trash.svg" alt="" />
                  </button>
                  <div className="catalog-item__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="catalog-item__container">
                    <p className="catalog-item__title">{item.title}</p>
                    <div className="catalog-item__price">
                      {item.last_price && (
                        <div className="catalog-item__price_old">
                          {formatPrice(item.last_price)}
                        </div>
                      )}
                      <div className="catalog-item__price_new">
                        {formatPrice(item.price)}
                      </div>
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
