export type TItem = {
  id: number;
  title: string;
  price: number;
  last_price?: number;
  image: string;
};

export type TItemResponse = {
  title: string;
  price: number;
  last_price?: number;
  image: TData<{ url: string }>;
};

export type TResponse<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

export type TData<T> = {
  data: {
    attributes: T;
  };
};
