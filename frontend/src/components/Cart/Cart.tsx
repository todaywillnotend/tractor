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

import * as styles from "./Cart.module.scss";

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
    <section className={styles.cart}>
      <Title text="Корзина" align="center" />
      {step === ECartStep.INIT && (
        <div className={styles.empty}>
          <h3>Тут пока пусто :(</h3>
          <img
            className={styles.emptyImage}
            src="/empty.jpg"
            alt="Корзина пуста"
          />
        </div>
      )}
      {step === ECartStep.CART && (
        <div className={styles.container}>
          <div className={styles.result}>
            <p className={styles.resultTitle}>Итог: {cartAmount}</p>
            <button
              className={styles.resultButton}
              onClick={() => setStep(ECartStep.FORM)}
            >
              Продолжить
            </button>
          </div>
          <div className={styles.items}>
            {(cartItems || []).map((item) => {
              const idAddedElement = cart.includes(item.id);

              return (
                <div className={styles.item}>
                  <button
                    className={styles.itemButtonTrash}
                    onClick={() => setCart(cart.filter((el) => el !== item.id))}
                  >
                    <img src={IconTrash} alt="" />
                  </button>
                  <Link to={`/catalog/${item.id}`} className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <div className={styles.itemContainer}>
                    <Link
                      to={`/catalog/${item.id}`}
                      className={styles.itemTitle}
                    >
                      {item.title}
                    </Link>
                    <div className={styles.itemPrice}>
                      {item.last_price && (
                        <div className={styles.itemPriceOld}>
                          {formatPrice(item.last_price)}
                        </div>
                      )}
                      {item.price && (
                        <div className={styles.itemPriceNew}>
                          {formatPrice(item.price)}
                        </div>
                      )}
                    </div>
                    <button
                      className={cn(styles.itemButton, {
                        [styles.itemButtonAdded]: idAddedElement,
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
        <div className={styles.form}>
          <Form cart={cart} title="" subtitle="" onSuccess={onFormSend} />
        </div>
      )}
    </section>
  );
};
