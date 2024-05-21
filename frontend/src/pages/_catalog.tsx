import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Catalog } from "../components/Catalog/Catalog";
import { Footer } from "../components/Footer/Footer";

const CatalogPage: React.FC<PageProps> = ({
  pageContext: { tags },
}: {
  pageContext: { tags?: string };
}) => {
  return (
    <main>
      <Header />
      <Catalog /> // TODO передать дефолтное значение из pageContext
      <Footer />
    </main>
  );
};

export default CatalogPage;

export const Head: HeadFC = ({
  pageContext: { tags },
}: {
  pageContext: { tags?: string };
}) => {
  return (
    <>
      <meta name="description" content={tags} />
      <title>Каталог</title>
    </>
  );
};
