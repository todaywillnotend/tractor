import React, { useState } from "react";
import cn from "classnames";
import ImageGallery from "react-image-gallery";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import {
  CART_LOCAL_STORAGE_KEY,
  SHOW_PRICE_LOCAL_STORAGE_KEY,
} from "../../const";
// @ts-ignore
import IconDone from "./../../images/icon-done.svg";
// @ts-ignore
import ShoppingCartOrangeIcon from "./../../images/shopping_cart_orange.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";
import { formatPrice } from "../../utils";

import * as styles from "./ProductItem.module.scss";

interface IProductItem {
  id: number;
  title: string;
  price?: number;
  last_price?: number;
  image: string;
  images: { original: string; thumbnail: string }[];
  description?: string;
  spec?: { key: string; value: string }[];
}

export const ProductItem: React.FC<IProductItem> = ({
  id,
  title,
  price,
  last_price,
  image,
  images,
  description,
  spec,
}) => {
  const [cart, setCart] = useLocalStorageData<number[]>(
    CART_LOCAL_STORAGE_KEY,
    []
  );

  const [_showPriceId, setShowPriceId] = useLocalStorageData<number | "">(
    SHOW_PRICE_LOCAL_STORAGE_KEY,
    ""
  );

  const addToCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter((el) => el !== id));
      return;
    }

    setCart([...cart, id]);
  };

  const onClickButtonShowPrice = (id: number) => {
    setShowPriceId(id);
  };

  const isAddedElement = cart.includes(id);

  const allImages = [{ original: image, thumbnail: image }, ...(images || [])];

  // const MAX_SPEC_COLLAPSED = 6;
  // const [specCollapsed, setSpecCollapsed] = useState(true);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.image}>
            {allImages && (
              <ImageGallery
                showFullscreenButton
                useBrowserFullscreen
                showPlayButton={false}
                showNav={false}
                thumbnailPosition="bottom"
                items={allImages}
              />
            )}
          </div>
          <div className={styles.action}>
            {!price && (
              <FeedbackPopup
                title="Узнать цену"
                subtitle="Отправьте форму и мы позвоним вам в ближайшее время"
                renderButton={({ openModal }) => (
                  <button
                    className={styles.priceButton}
                    onClick={() => {
                      onClickButtonShowPrice(id);
                      openModal();
                    }}
                  >
                    Узнать цену
                  </button>
                )}
              />
            )}
            {price && (
              <div className={styles.price}>
                {last_price && (
                  <div className={styles.priceOld}>
                    {formatPrice(last_price)}
                  </div>
                )}
                <div className={styles.priceNew}>{formatPrice(price)}</div>
              </div>
            )}
            <button
              className={cn(styles.button, {
                [styles.buttonAdded]: isAddedElement,
              })}
              onClick={() => addToCart(id)}
            >
              {isAddedElement ? (
                <img src={IconDone} alt="" />
              ) : (
                <img src={ShoppingCartOrangeIcon} alt="" />
              )}
              {isAddedElement ? <span>Добавлено</span> : <span>В корзину</span>}
            </button>
          </div>
          {spec && (
            <div className={styles.spec}>
              <p className={styles.specTitle}>Характеристики:</p>
              <div className={styles.specItems}>
                {spec.map(({ key, value }, index) => {
                  // const isHidden = index > MAX_SPEC_COLLAPSED && specCollapsed;

                  return (
                    <div
                      className={cn(styles.specItem, {
                        // [styles.visuallyHidden]: isHidden,
                      })}
                    >
                      <p className={styles.specItemKey}>{key}:</p>
                      <p className={styles.specItemValue}>{value}</p>
                    </div>
                  );
                })}
                {/* <button onClick={() => setSpecCollapsed((prev) => !prev)}>
                  {specCollapsed ? "Развернуть" : "Свернуть"}
                </button> */}
              </div>
            </div>
          )}
          {description && (
            <div className={styles.description}>
              <p className={styles.descriptionTitle}>Описание:</p>
              <p className={styles.descriptionText}>{description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
