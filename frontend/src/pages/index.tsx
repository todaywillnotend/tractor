import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Catalog } from "../components/Catalog/Catalog";
import { Features } from "../components/Features/Features";
import { Contacts } from "../components/Contacts/Contacts";
import { PhotoGallery } from "../components/PhotoGallery/PhotoGallery";
import { Form } from "../components/Form/Form";
import { Footer } from "../components/Footer/Footer";
import { Leasing } from "../components/Leasing/Leasing";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="mainWrapper">
      <Header />
      <Main />
      <Leasing />
      <Catalog />
      <Features />
      <Contacts />
      <PhotoGallery />
      <Form />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>ТракторСтрой - продажа сельхозтехники.</title>
    <meta
      name="description"
      content="Интернет-магазин по продаже сельхозтехники и различного сельскохозяйственного оборудования. У нас Вы можете купить сельхозтехнику: трактора, бульдозеры и запчасти к ним, кормораздатчики, зерносушилки."
    />
    <meta
      name="keywords"
      content="купить сельхозтехнику, продажа сельхозтехники, сельскохозяйственная техника, магазин сельхозтехники, t-150, трактор, бульдозер, кормораздатчик, зерносушилка"
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content='Интернет-магазин "ТракторСтрой" - продажа сельхозтехники.'
    />
    <meta
      property="og:image"
      content={`${process.env.GATSBY_FRONTEND_URL}/tractor.png`}
    />
    <meta property="og:url" content={process.env.GATSBY_FRONTEND_URL} />
    <meta
      property="og:description"
      content="Интернет-магазин по продаже сельхозтехники и различного сельскохозяйственного оборудования. У нас Вы можете купить сельхозтехнику: трактора, бульдозер"
    />
  </>
);
