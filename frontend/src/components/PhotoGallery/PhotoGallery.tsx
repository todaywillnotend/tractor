import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title/Title";
import { CommonContext } from "../../context/CommonContext";
import { TPhoto } from "../../types";
import cn from "classnames";

import "./PhotoGallery.scss";

export const PhotoGallery: React.FC = () => {
  const { photos } = useContext(CommonContext);

  useEffect(() => {
    if (photos[0]?.id) {
      setMainImage(photos[0]);
    }
  }, [photos]);

  const [mainImage, setMainImage] = useState<TPhoto>(photos[0]);

  return (
    <section className="photo-gallery">
      <div className="photo-gallery__container">
        <Title text="Фотогалерея" />
        <div className="photo-gallery__content">
          <div className="photo-gallery__main">
            <img src={mainImage?.src} alt="" />
          </div>
          <div className="photo-gallery__items">
            {photos.map((item) => {
              const isMainImage = item.id === mainImage?.id;

              return (
                <div
                  className={cn("photo-gallery__item", {
                    ["photo-gallery__item_main"]: isMainImage,
                  })}
                  onClick={() => setMainImage(item)}
                >
                  <img src={item.thumbnailSrc} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
