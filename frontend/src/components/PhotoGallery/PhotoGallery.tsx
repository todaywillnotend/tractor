import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title/Title";
import { CommonContext } from "../../context/CommonContext";
import { TPhoto } from "../../types";
import cn from "classnames";
import ImageGallery from "react-image-gallery";

import "./PhotoGallery.scss";

export const PhotoGallery: React.FC = () => {
  const photos = useContext(CommonContext)?.state?.photos || [];

  useEffect(() => {
    if (photos[0]?.id) {
      setMainImage(photos[0]);
    }
  }, [photos]);

  const [mainImage, setMainImage] = useState<TPhoto>();

  return (
    <div className="image-gallery-wrapper">
      <ImageGallery
        showFullscreenButton
        useBrowserFullscreen
        showPlayButton={false}
        thumbnailPosition="bottom"
        items={photos.map((el) => ({
          original: el.src,
          thumbnail: el.thumbnailSrc,
        }))}
      />
    </div>
  );
};
