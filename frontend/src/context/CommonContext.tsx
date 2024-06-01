import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  TItem,
  TItemResponse,
  TPhoto,
  TPhotosResponse,
  TResponseCollection,
  TResponseSingle,
} from "../types";
import { getCatalogItems, getPhotos } from "../api";

interface IContextValue {
  state: {
    cart: TItem[];
    catalog: TItem[];
    photos: TPhoto[];
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
    },
    actions: {
      getCatalogItems: async (page: number) => {
        const catalogDataForPage = await getCatalogItems(page);

        setState((prev) => ({
          ...prev,
          state: {
            ...prev.state,
            catalog: [...prev.state.catalog, ...catalogDataForPage],
          },
        }));
      },
    },
  });

  useEffect(() => {
    (async () => {
      const catalogData = await getCatalogItems(1);
      const photosData = await getPhotos();

      setState((prev) => ({
        ...prev,
        state: {
          ...prev.state,
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
  return <CommonContextProvider>{element}</CommonContextProvider>;
};

export { CommonContext, CommonContextProvider, commonElementWrapper };
