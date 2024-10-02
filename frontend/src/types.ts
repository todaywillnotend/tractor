export type TItem = {
  id: number;
  title: string;
  price?: number;
  last_price?: number;
  image: string;
  images: {
    original: string;
    thumbnail: string;
  }[];
  description?: string;
  spec?: { key: string; value: string }[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
};

export type TItemResponse = {
  title: string;
  price?: number;
  last_price?: number;
  image: TDataSignle<{ url: string; formats: { thumbnail: { url: string } } }>;
  images: TDataCollection<{
    url: string;
    formats: { thumbnail: { url: string } };
  }>;
  description?: string;
  spec?: { key: string; value: string }[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
};

export type TResponseCollection<T> = {
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

export type TDataSignle<T> = {
  data: {
    attributes: T;
  };
};

export type TDataCollection<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

export type TResponseSingle<T> = {
  data: {
    id: number;
    attributes: T;
  };
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

export type TPhotosResponse = {
  image: TDataCollection<{
    url: string;
    formats: { thumbnail: { url: string } };
  }>;
};

export type TPhoto = {
  id: number;
  src: string;
  thumbnailSrc: string;
};
