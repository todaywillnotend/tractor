import React, { useContext, useState } from "react";
import { Link, navigate } from "gatsby";

import { Title } from "../Title/Title";
import cn from "classnames";

import * as styles from "./Catalog.module.scss";

import {
  CART_LOCAL_STORAGE_KEY,
  navigationItems,
  SHOW_PRICE_LOCAL_STORAGE_KEY,
} from "../../const";
import { CommonContext } from "../../context/CommonContext";
import { formatPrice, getRandomElements } from "../../utils";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
// @ts-ignore
import IconDone from "./../../images/icon-done.svg";
// @ts-ignore
import ShoppingCartOrangeIcon from "./../../images/shopping_cart_orange.svg";
import { FeedbackPopup } from "../FeedbackPopup/FeedbackPopup";

interface ICatalog {
  isCatalogPage?: boolean;
  title?: string;
  maxItems?: number;
}

export const Catalog: React.FC<ICatalog> = ({
  isCatalogPage = false,
  title = "Каталог",
  maxItems,
}) => {
  const catalog = useContext(CommonContext)?.state?.catalog || [];
  const hasMorePage =
    useContext(CommonContext)?.state?.hasMorePageForCatalogItems;
  const getCatalogItems = useContext(CommonContext)?.actions?.getCatalogItems;

  const [cart, setCart] = useLocalStorageData<number[]>(
    CART_LOCAL_STORAGE_KEY,
    []
  );

  const [_showPriceId, setShowPriceId] = useLocalStorageData<number | "">(
    SHOW_PRICE_LOCAL_STORAGE_KEY,
    ""
  );

  const [page, setPage] = useState(1);

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

  const onButtonClick = () => {
    if (isCatalogPage) {
      const nextPage = page + 1;
      getCatalogItems(nextPage);
      setPage(nextPage);
    } else {
      navigate(navigationItems.catalog.href);
    }
  };

  const newCatalog =
    maxItems && catalog.length && getRandomElements(catalog, maxItems);

  return (
    <section className={styles.catalog}>
      <div className={styles.container}>
        <Title text={title} />
        <div className={styles.items}>
          {(newCatalog || catalog || []).map((item) => {
            const isAddedElement = cart.includes(item.id);

            return (
              <div className={styles.item} key={item.id}>
                <Link to={`/catalog/${item.id}`} className={styles.itemImage}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className={styles.itemContainer}>
                  <Link to={`/catalog/${item.id}`} className={styles.itemTitle}>
                    {item.title}
                  </Link>
                  {item.price && (
                    <div className={styles.itemPrice}>
                      {item.last_price && (
                        <div className={styles.itemPriceOld}>
                          {formatPrice(item.last_price)}
                        </div>
                      )}
                      <div className={styles.itemPriceNew}>
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  )}
                  {!item.price && (
                    <FeedbackPopup
                      title="Узнать цену"
                      subtitle="Отправьте форму и мы свяжемся с Вами в ближайшее время"
                      renderButton={({ openModal }) => (
                        <button
                          className={cn(
                            styles.itemPrice,
                            styles.itemPriceButton
                          )}
                          onClick={() => {
                            onClickButtonShowPrice(item.id);
                            openModal();
                          }}
                        >
                          Узнать цену
                        </button>
                      )}
                    />
                  )}
                  <button
                    className={cn(styles.itemButton, {
                      [styles.itemButtonAdded]: isAddedElement,
                    })}
                    onClick={() => addToCart(item.id)}
                  >
                    {isAddedElement ? (
                      <img src={IconDone} alt="" />
                    ) : (
                      <img src={ShoppingCartOrangeIcon} alt="" />
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
        {hasMorePage && (
          <button className={styles.button} onClick={onButtonClick}>
            {isCatalogPage ? "Показать еще" : "Перейти в католог"}
          </button>
        )}
      </div>
    </section>
  );
};
