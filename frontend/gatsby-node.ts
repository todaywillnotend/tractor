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
    images: item?.attributes?.images?.data?.map((el) => ({
      original: `${process.env.GATSBY_BACKEND_URL}${el?.attributes?.url}`,
      thumbnail: `${process.env.GATSBY_BACKEND_URL}${el?.attributes?.formats?.thumbnail?.url}`,
    })),
  }));
};

async function checkBackendAvailability(
  url: string,
  delay: number,
  maxAttempts: number
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url, { method: "HEAD" });

      if (response.ok) {
        // Backend is available
        console.log("Backend is up - executing command");
        return true;
      }
      console.log("Backend is unavailable - sleeping");
    } catch (error) {
      console.error("Error request", url, error);
      // Ignoring the error as the fetch will fail if the backend is not available
    }

    // Waiting for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Backend is not available
  return false;
}

const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const isBackendAvailable = await checkBackendAvailability(
    process.env.STRAPI_URL as string,
    5000,
    120
  );

  if (!isBackendAvailable) {
    console.error("Backend is not available.");
    return;
  }

  try {
    const responseCatalog = await fetch(
      `${process.env.STRAPI_URL}/api/catalogs?populate=*` as string,
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

    catalogData.forEach((item) => {
      createPage({
        path: `/catalog/${item.id}`,
        component: resolve("src/templates/item.tsx"),
        context: {
          id: item.id,
          title: item?.title,
          price: item?.price,
          last_price: item?.last_price,
          image: item?.image,
          images: item?.images,
          description: item?.description,
          spec: item?.spec,
          meta_description: item?.meta_description,
          meta_title: item?.meta_title,
          meta_keywords: item?.meta_keywords,
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export { createPages };
