import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Catalog } from "../components/Catalog/Catalog";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <Main />
      <Catalog />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Главная</title>;
