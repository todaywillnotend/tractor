import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ProductItem } from "../components/ProductItem/ProductItem";

const CatalogPage: React.FC<PageProps> = ({
  pageContext: { id, title, price, last_price, image, description, spec },
}: {
  pageContext: {
    id?: number;
    title?: string;
    price?: number;
    last_price?: number;
    image?: string;
    description?: string;
    spec?: { key: string; value: string }[];
  };
}) => {
  if (!id || !title || !price || !image) return null;

  return (
    <main className="mainWrapper">
      <Header />
      <ProductItem
        id={id}
        title={title}
        price={price}
        last_price={last_price}
        image={image}
        description={description}
        spec={spec}
      />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default CatalogPage;

export const Head: HeadFC = ({
  pageContext: { title, meta_title, meta_description, meta_keywords },
}: {
  pageContext: {
    title?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
}) => {
  return (
    <>
      <title>{meta_title || title}</title>
      <meta name="description" content={meta_description} />
      <meta name="keywords" content={meta_keywords} />
    </>
  );
};
