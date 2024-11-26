import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title/Title";
import { CommonContext } from "../../context/CommonContext";
import { TPhoto } from "../../types";
import ImageGallery from "react-image-gallery";

import * as styles from "./PhotoGallery.module.scss";

export const PhotoGallery: React.FC = () => {
  const photos = useContext(CommonContext)?.state?.photos || [];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <Title align="left" text="Фотогалерея" />
        <div className={styles.content}>
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
      </div>
    </section>
  );
};
