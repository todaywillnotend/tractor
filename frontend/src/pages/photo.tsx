import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";

const PhotoPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
    </main>
  );
};

export default PhotoPage;

export const Head: HeadFC = () => <title>Фото</title>;
