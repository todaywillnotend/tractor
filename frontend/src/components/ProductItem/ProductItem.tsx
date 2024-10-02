import React from "react";
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

import "./ProductItem.scss";

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

  return (
    <section className="product-item">
      <div className="product-item__container">
        <div className="product-item__content">
          <h1 className="product-item__title">{title}</h1>
          <div className="product-item__image">
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
          <div className="product-item__action">
            {!price && (
              <FeedbackPopup
                title="Узнать цену"
                subtitle="Отправьте форму и мы позвоним вам в ближайшее время"
                renderButton={({ openModal }) => (
                  <button
                    className={cn(
                      "catalog-item__price catalog-item__price-button"
                    )}
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
              <div className="catalog-item__price">
                {last_price && (
                  <div className="catalog-item__price_old">
                    {formatPrice(last_price)}
                  </div>
                )}
                <div className="catalog-item__price_new">
                  {formatPrice(price)}
                </div>
              </div>
            )}
            <button
              className={cn("catalog-item__button", {
                "catalog-item__button_added": isAddedElement,
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
            <div className="product-item__spec spec">
              <p className="spec__title">Характеристики:</p>
              <div className="spec__items">
                {spec.map(({ key, value }) => (
                  <div className="spec__item spec-item">
                    <p className="spec-item__key">{key}:</p>
                    <p className="spec-item__value">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {description && (
            <div className="product-item__description description">
              <p className="description__title">Описание:</p>
              <p className="description__text">{description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
