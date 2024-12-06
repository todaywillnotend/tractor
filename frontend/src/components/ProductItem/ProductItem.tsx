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
// @ts-ignore
import IconArrowMini from "./../../images/icon-arrow-mini.svg";
// @ts-ignore
import IconArrowDelivery from "./../../images/icon-arrow-delivery.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";
import { formatPrice } from "../../utils";

import * as styles from "./ProductItem.module.scss";
import { Catalog } from "../Catalog/Catalog";

interface IProductItem {
  id: number;
  title: string;
  price?: number;
  last_price?: number;
  image: string;
  images: { original: string; thumbnail: string }[];
  videos?: string[];
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
  videos,
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

  const MAX_SPEC_COLLAPSED = 6;
  const [specCollapsed, setSpecCollapsed] = useState(true);
  const showSpecButton = (spec?.length || 0) > MAX_SPEC_COLLAPSED;

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
            <div className={styles.specWrapper}>
              <div className={styles.spec}>
                <p className={styles.specTitle}>Характеристики:</p>
                <div className={styles.specItems}>
                  {spec.map(({ key, value }, index) => {
                    const isHidden =
                      index > MAX_SPEC_COLLAPSED && specCollapsed;

                    return (
                      <div
                        className={cn(styles.specItem, {
                          [styles.visuallyHidden]: isHidden,
                        })}
                      >
                        <p className={styles.specItemKey}>{key}:</p>
                        <p className={styles.specItemValue}>{value}</p>
                      </div>
                    );
                  })}
                  {showSpecButton && (
                    <button
                      onClick={() => setSpecCollapsed((prev) => !prev)}
                      className={styles.specButton}
                    >
                      {specCollapsed ? "Развернуть" : "Свернуть"}
                      <img
                        src={IconArrowMini}
                        alt=""
                        className={cn(styles.specIcon, {
                          [styles.specIconCollapsed]: specCollapsed,
                        })}
                      />
                    </button>
                  )}
                </div>
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
      <div className={styles.delivery}>
        <div className={styles.container}>
          <div className={styles.deliveryContent}>
            <p className={styles.deliveryTitle}>Порядок</p>
            <div className={styles.deliveryItems}>
              <div className={styles.deliveryItem}>
                <p className={styles.deliveryItemNumber}>1</p>
                <p className={styles.deliveryItemTitle}>звонок</p>
                <p className={styles.deliveryItemSubtitle}>
                  Позвоните нам или оставьте заявкуа на сайте
                </p>
              </div>
              <img
                src={IconArrowDelivery}
                alt=""
                className={styles.deliveryIcon}
              />
              <div className={styles.deliveryItem}>
                <p className={styles.deliveryItemNumber}>2</p>
                <p className={styles.deliveryItemTitle}>Консультация</p>
                <p className={styles.deliveryItemSubtitle}>
                  Наш менеджер свяжется с вами для консультации
                </p>
              </div>
              <img
                src={IconArrowDelivery}
                alt=""
                className={styles.deliveryIcon}
              />
              <div className={styles.deliveryItem}>
                <p className={styles.deliveryItemNumber}>3</p>
                <p className={styles.deliveryItemTitle}>договор и оплата</p>
                <p className={styles.deliveryItemSubtitle}>
                  Заключение договора и оплата товара
                </p>
              </div>
              <img
                src={IconArrowDelivery}
                alt=""
                className={styles.deliveryIcon}
              />
              <div className={styles.deliveryItem}>
                <p className={styles.deliveryItemNumber}>4</p>
                <p className={styles.deliveryItemTitle}>доставка</p>
                <p className={styles.deliveryItemSubtitle}>
                  Мы доставим ваш товар в любую точку России
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {Boolean(videos?.length) && (
        <div className={styles.movies}>
          <div className={styles.container}>
            <div className={styles.moviesContent}>
              <p className={styles.moviesTitle}>Видео</p>
              <div className={styles.moviesItems}>
                {videos?.map((video, index) => {
                  return (
                    <iframe
                      className={styles.moviesItem}
                      key={index}
                      width="588"
                      height="330"
                      src={video}
                      frameBorder="0"
                      allow="clipboard-write; autoplay"
                      allowFullScreen
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Catalog title="Другие товары" maxItems={4} />
    </section>
  );
};
