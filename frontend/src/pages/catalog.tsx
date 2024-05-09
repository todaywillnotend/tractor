import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";

const CatalogPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
    </main>
  );
};

export default CatalogPage;

export const Head: HeadFC = () => <title>Каталог</title>;
