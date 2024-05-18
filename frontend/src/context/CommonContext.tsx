import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TData, TItem, TItemResponse, TResponse } from "../types";

interface IContextValue {
  cart: TItem[];
  catalog: TItem[];
}

const CommonContext = React.createContext<IContextValue>({} as IContextValue);

const defaultState: IContextValue = {
  cart: [],
  catalog: [],
};

const CommonContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [state, setState] = useState<IContextValue>(defaultState);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/catalogs?populate=*` as string,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
          },
        }
      );
      const responseJson: TResponse<TItemResponse> = await response.json();

      const formateData = (responseJson: TResponse<TItemResponse>): TItem[] => {
        return responseJson.data.map((item) => ({
          ...(item?.attributes || {}),
          id: item.id,
          image: `${process.env.BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
        }));
      };

      setState((prev) => ({
        ...prev,
        catalog: responseJson.data ? formateData(responseJson) : [],
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
