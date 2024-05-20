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

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
      <Main />
      <Catalog />
      <Features />
      <Contacts />
      <PhotoGallery />
      <Form />
      <Footer />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Главная</title>;
