import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Catalog } from "../components/Catalog/Catalog";
import { Footer } from "../components/Footer/Footer";

const CatalogPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
      <Catalog />
      <Footer />
    </main>
  );
};

export default CatalogPage;

export const Head: HeadFC = ({
  pageContext: { keywords },
}: {
  pageContext: { keywords?: string };
}) => {
  return (
    <>
      <meta
        name="description"
        content={`Продажа тракторов и запчастей к ним. Каталог товараров: ${keywords}. Цены от производителя, в наличии или под заказ 21 день. Гарантии. Доставка во все регионы РФ и СНГ.`}
      />
      <meta name="keywords" content={keywords} />
      <title>Каталог</title>
    </>
  );
};
