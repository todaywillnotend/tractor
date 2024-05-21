import { useCallback, useMemo, useState } from "react";

interface IOptions {
  limit?: number;
  pagination?: {
    pages?: number | null;
    size?: number | null;
  };
}

interface IResult {
  hasMorePage: boolean;
  offset: number;
  increasePage: () => void;
  dropState: () => void;
}

export const usePagination = (options: IOptions): IResult => {
  const { limit = 20, pagination } = options;

  const [offset, setOffset] = useState<number>(0);

  const hasMorePage = useMemo(() => {
    // Первый запрос, когда нет информации о количестве элементов в списке
    if (!pagination?.pages) {
      return false;
    }

    // "ИЛИ 1" нужно, так как отсчет стараниц начинается с единицы
    const currentPage = Math.ceil(offset / limit) || 1;

    return currentPage < pagination.pages;
  }, [pagination, offset, limit]);

  const increasePage = useCallback(() => {
    if (hasMorePage) {
      setOffset((p) => p + limit);
    }
  }, [hasMorePage, limit]);

  const dropState = useCallback(() => {
    setOffset(0);
  }, []);

  return {
    hasMorePage,
    offset,
    increasePage,
    dropState,
  };
};
