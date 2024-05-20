import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { PhotoGallery } from "../components/PhotoGallery/PhotoGallery";
import { Footer } from "../components/Footer/Footer";

const PhotoPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
      <PhotoGallery />
      <Footer />
    </main>
  );
};

export default PhotoPage;

export const Head: HeadFC = () => <title>Фото</title>;
