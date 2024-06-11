import { GatsbyNode } from "gatsby";
import { resolve } from "path";

import { TItem, TItemResponse, TResponseCollection } from "./src/types";

const formatCatalogData = (
  responseJson: TResponseCollection<TItemResponse>
): TItem[] => {
  return responseJson.data.map((item) => ({
    ...(item?.attributes || {}),
    id: item.id,
    image: `${process.env.GATSBY_BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
  }));
};

const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    const responseCatalog = await fetch(
      `${process.env.GATSBY_BACKEND_URL}/api/catalogs?populate=*&pagination[pageSize]=8` as string,
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

    const keywords = catalogData.map((item) => item.title).join(", ");

    createPage({
      path: "/catalog",
      component: resolve("src/templates/catalog.tsx"),
      context: {
        keywords,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { createPages };
