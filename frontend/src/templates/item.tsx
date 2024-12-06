import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ProductItem } from "../components/ProductItem/ProductItem";

const CatalogPage: React.FC<PageProps> = ({
  pageContext: {
    id,
    title,
    price,
    last_price,
    image,
    images = [],
    description,
    spec,
    videos,
  },
}: {
  pageContext: {
    id?: number;
    title?: string;
    price?: number;
    last_price?: number;
    image?: string;
    images?: { original: string; thumbnail: string }[];
    description?: string;
    spec?: { key: string; value: string }[];
    videos?: string[];
  };
}) => {
  if (!id || !title || !image) return null;

  return (
    <main className="mainWrapper">
      <Header />
      <ProductItem
        id={id}
        title={title}
        price={price}
        last_price={last_price}
        image={image}
        images={images}
        description={description}
        spec={spec}
        videos={videos}
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
