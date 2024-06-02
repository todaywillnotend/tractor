import React, { useContext, useState } from "react";
import { navigate } from "gatsby";

import { Title } from "../Title/Title";
import cn from "classnames";

import "./Catalog.scss";

import {
  CART_LOCAL_STORAGE_KEY,
  MAX_ITEMS_COUNT,
  navigationItems,
} from "../../const";
import { CommonContext } from "../../context/CommonContext";
import { formatPrice } from "../../utils";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";

interface ICatalog {
  isCatalogPage?: boolean;
}

export const Catalog: React.FC<ICatalog> = ({ isCatalogPage = false }) => {
  const catalog = useContext(CommonContext)?.state?.catalog || [];
  const getCatalogItems = useContext(CommonContext)?.actions?.getCatalogItems;

  const [cart, setCart] = useLocalStorageData<number[]>(
    CART_LOCAL_STORAGE_KEY,
    []
  );

  const [page, setPage] = useState(1);

  const addToCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter((el) => el !== id));
      return;
    }

    setCart([...cart, id]);
  };

  const onButtonClick = () => {
    if (isCatalogPage) {
      const nextPage = page + 1;
      getCatalogItems(nextPage);
      setPage(nextPage);
    } else {
      navigate(navigationItems.catalog.href);
    }
  };

  return (
    <section className="catalog">
      <div className="catalog__container">
        <Title text="каталог" />
        <div className="catalog__items">
          {(catalog || []).map((item, index) => {
            if (!isCatalogPage && index > MAX_ITEMS_COUNT - 1) {
              return null;
            }

            const isAddedElement = cart.includes(item.id);

            return (
              <div className="catalog__item catalog-item">
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
                      "catalog-item__button_added": isAddedElement,
                    })}
                    onClick={() => addToCart(item.id)}
                  >
                    {isAddedElement ? (
                      <img src="/icon-done.svg" alt="" />
                    ) : (
                      <img src="/shopping_cart_orange.svg" alt="" />
                    )}
                    {isAddedElement ? (
                      <span>Добавлено</span>
                    ) : (
                      <span>В корзину</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="catalog__button" onClick={onButtonClick}>
          {isCatalogPage ? "Показать еще" : "Перейти в католог"}
        </button>
      </div>
    </section>
  );
};
