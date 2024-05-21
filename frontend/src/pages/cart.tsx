import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Catalog } from "../components/Catalog/Catalog";
import { Footer } from "../components/Footer/Footer";

const CartPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
      <Catalog />
      <Footer />
    </main>
  );
};

export default CartPage;

export const Head: HeadFC = () => <title>Корзина</title>;
