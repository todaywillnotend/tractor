import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Главная</title>;
