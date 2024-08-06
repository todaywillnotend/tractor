import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  TItem,
  TPhoto,
} from "../types";
import { getCatalogItems, getPhotos } from "../api";
import CookieConsent from "react-cookie-consent";

interface IContextValue {
  state: {
    cart: TItem[];
    catalog: TItem[];
    photos: TPhoto[];
    hasMorePageForCatalogItems: boolean;
  };
  actions: {
    getCatalogItems: (page: number) => void;
  };
}

const CommonContext = React.createContext<IContextValue>({} as IContextValue);

const CommonContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [state, setState] = useState<IContextValue>({
    state: {
      cart: [],
      catalog: [],
      photos: [],
      hasMorePageForCatalogItems: true,
    },
    actions: {
      getCatalogItems: async (page: number) => {
        const {data: catalogDataForPage, hasMorePage } = await getCatalogItems(page);

        setState((prev) => ({
          ...prev,
          state: {
            ...prev.state,
            hasMorePageForCatalogItems: hasMorePage,
            catalog: [...prev.state.catalog, ...catalogDataForPage],
          },
        }));
      },
    },
  });

  useEffect(() => {
    (async () => {
       const { data: catalogData, hasMorePage } = await getCatalogItems(1);
      const photosData = await getPhotos();

      setState((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          hasMorePageForCatalogItems: hasMorePage,
          catalog: catalogData,
          photos: photosData,
        },
      }));
    })();
  }, []);

  return (
    <CommonContext.Provider value={state}>{children}</CommonContext.Provider>
  );
};

const commonElementWrapper = (element: React.ReactElement) => {
  return (
    <>
      <CommonContextProvider>{element}</CommonContextProvider>
      <CookieConsent buttonText="Принять">
        Мы используем файлы cookie. Продолжив работу с сайтом, вы подтверждаете,
        что ознакомлены и соглашаетесь с{" "}
        <a
          href="/privacy"
          className="privacy-link"
          target="_blank"
          style={{ color: "rgba(255, 120, 45, 1)" }}
        >
          Политикой&#160;конфиденциальности
        </a>
        .
      </CookieConsent>
    </>
  );
};

export { CommonContext, CommonContextProvider, commonElementWrapper };
