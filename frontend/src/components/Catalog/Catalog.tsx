import React, { useContext } from "react";
import { Link } from "gatsby";
import { Title } from "../Title/Title";
import cn from "classnames";

import "./Catalog.scss";

import { CART_LOCAL_STORAGE_KEY, navigationItems } from "../../const";
import { CommonContext } from "../../context/CommonContext";
import { formatPrice } from "../../utils";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";

export const Catalog: React.FC = () => {
  const { catalog } = useContext(CommonContext);

  const [cart, setCart] = useLocalStorageData<number[]>(
    CART_LOCAL_STORAGE_KEY,
    []
  );

  const addToCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter((el) => el !== id));
      return;
    }

    setCart([...cart, id]);
  };

  return (
    <section className="catalog">
      <div className="catalog__container">
        <Title text="каталог" />
        <div className="catalog__items">
          {catalog.map((item) => {
            const idAddedElement = cart.includes(item.id);

            return (
              <div className="catalog__item item">
                <div className="item__image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item__container">
                  <p className="item__title">{item.title}</p>
                  <div className="item__price">
                    {item.last_price && (
                      <div className="item__price_old">
                        {formatPrice(item.last_price)}
                      </div>
                    )}
                    <div className="item__price_new">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  <button
                    className={cn("item__button", {
                      item__button_added: idAddedElement,
                    })}
                    onClick={() => addToCart(item.id)}
                  >
                    <img src="/shopping_cart_orange.svg" alt="" />
                    {idAddedElement ? (
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
        <Link to={navigationItems.catalog.href} className="catalog__button">
          Показать еще
        </Link>
      </div>
    </section>
  );
};
