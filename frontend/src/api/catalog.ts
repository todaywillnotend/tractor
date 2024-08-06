import { MAX_ITEMS_COUNT } from "../const";
import { TItem, TItemResponse, TResponseCollection } from "../types";

export const getCatalogItems = async (page: number = 1): Promise<{ data: TItem[], hasMorePage: boolean }> => {
  try {
    const responseCatalog = await fetch(
      `${process.env.GATSBY_BACKEND_URL}/api/catalogs?populate=*&pagination[page]=${page}&&pagination[pageSize]=${MAX_ITEMS_COUNT}` as string,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_BACKEND_TOKEN}`,
        },
      }
    );

    const responseCatalogJson: TResponseCollection<TItemResponse> =
      await responseCatalog.json();

    const catalogData = responseCatalogJson?.data
      ? formatCatalogData(responseCatalogJson)
      : [];

    const hasMorePage =
      responseCatalogJson.meta.pagination.total > page * MAX_ITEMS_COUNT;

    return { data: catalogData, hasMorePage };
  } catch (error) {
    console.error(error);
    return { data: [], hasMorePage: false };
  }
};

const formatCatalogData = (
  responseJson: TResponseCollection<TItemResponse>
): TItem[] => {
  return responseJson.data.map((item) => ({
    ...(item?.attributes || {}),
    id: item.id,
    image: `${process.env.GATSBY_BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
  }));
};
