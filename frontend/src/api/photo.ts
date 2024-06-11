import { TPhoto, TPhotosResponse, TResponseSingle } from "../types";

export const getPhotos = async () => {
  try {
    const responsePhotos = await fetch(
      `${process.env.GATSBY_BACKEND_URL}/api/photo?populate=*&sort[1]=updatedAt:desc` as string,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_BACKEND_TOKEN}`,
        },
      }
    );

    const responsePhotosJson: TResponseSingle<TPhotosResponse> =
      await responsePhotos.json();

    const photosData = responsePhotosJson.data
      ? formatPhotosData(responsePhotosJson)
      : [];

    return photosData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formatPhotosData = (
  responseJson: TResponseSingle<TPhotosResponse>
): TPhoto[] => {
  return responseJson?.data?.attributes.image.data.map((item) => ({
    id: item.id,
    src: process.env.GATSBY_BACKEND_URL + item.attributes.url,
    thumbnailSrc:
      process.env.GATSBY_BACKEND_URL +
      item?.attributes?.formats?.thumbnail?.url,
  }));
};
