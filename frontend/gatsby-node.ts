import { GatsbyNode } from "gatsby";
import { resolve } from "path";

import { TItem, TItemResponse, TResponseCollection } from "./src/types";

const formatCatalogData = (
  responseJson: TResponseCollection<TItemResponse>
): TItem[] => {
  return responseJson.data.map((item) => ({
    ...(item?.attributes || {}),
    id: item.id,
    image: `${process.env.BACKEND_URL}${item?.attributes?.image?.data?.attributes?.url}`,
  }));
};

const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const responseCatalog = await fetch(
    `${process.env.BACKEND_URL}/api/catalogs?populate=*&pagination[pageSize]=8` as string,
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

  const tags = catalogData.map((item) => item.title).join(",");

  createPage({
    path: "/catalog",
    // component: resolve(__dirname, "./src/templates/catalog.tsx"),
    component: resolve("src/templates/catalog.tsx"),
    context: {
      tags,
    },
  });
};

export { createPages };
