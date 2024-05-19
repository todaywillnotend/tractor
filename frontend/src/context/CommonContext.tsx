import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  TItem,
  TItemResponse,
  TPhoto,
  TPhotosResponse,
  TResponseCollection,
  TResponseSingle,
} from "../types";

const formatCatalogData = (
  responseJson: TResponseCollection<TItemResponse>
): TItem[] => {
  return responseJson.data.map((item) => ({
    ...(item?.attributes || {}),
    id: item.id,
    image: `${process.env.BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
  }));
};

const formatPhotosData = (
  responseJson: TResponseSingle<TPhotosResponse>
): TPhoto[] => {
  return responseJson?.data?.attributes.image.data.map((item) => ({
    id: item.id,
    src: process.env.BACKEND_URL + item.attributes.url,
    thumbnailSrc:
      process.env.BACKEND_URL + item?.attributes?.formats?.thumbnail?.url,
  }));
};

interface IContextValue {
  cart: TItem[];
  catalog: TItem[];
  photos: TPhoto[];
}

const CommonContext = React.createContext<IContextValue>({} as IContextValue);

const defaultState: IContextValue = {
  cart: [],
  catalog: [],
  photos: [],
};

const CommonContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [state, setState] = useState<IContextValue>(defaultState);

  useEffect(() => {
    (async () => {
      const responseCatalog = await fetch(
        `${process.env.BACKEND_URL}/api/catalogs?populate=*` as string,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
          },
        }
      );
      const responseCatalogJson: TResponseCollection<TItemResponse> =
        await responseCatalog.json();

      const catalogData = responseCatalogJson?.data
        ? formatCatalogData(responseCatalogJson)
        : [];

      const responsePhotos = await fetch(
        `${process.env.BACKEND_URL}/api/photo?populate=*&sort[1]=updatedAt:desc` as string,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
          },
        }
      );

      const responsePhotosJson: TResponseSingle<TPhotosResponse> =
        await responsePhotos.json();

      console.log("responsePhotosJson", responsePhotosJson);

      const photosData = responsePhotosJson.data
        ? formatPhotosData(responsePhotosJson)
        : [];

      setState((prev) => ({
        ...prev,
        catalog: catalogData,
        photos: photosData,
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
