import { MAX_ITEMS_COUNT } from "../const";
import { TItem, TItemResponse, TResponseCollection } from "../types";

export const getCatalogItems = async (page: number = 1) => {
  try {
    const responseCatalog = await fetch(
      `${process.env.BACKEND_URL}/api/catalogs?populate=*&pagination[page]=${page}&&pagination[pageSize]=${MAX_ITEMS_COUNT}` as string,
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

    return catalogData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formatCatalogData = (
  responseJson: TResponseCollection<TItemResponse>
): TItem[] => {
  return responseJson.data.map((item) => ({
    ...(item?.attributes || {}),
    id: item.id,
    image: `${process.env.BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
  }));
};
