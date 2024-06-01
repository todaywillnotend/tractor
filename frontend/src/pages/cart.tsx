import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Cart } from "../components/Cart/Cart";

const CartPage: React.FC<PageProps> = () => {
  return (
    <main className="mainWrapper">
      <Header />
      <Cart />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default CartPage;

export const Head: HeadFC = () => <title>Корзина</title>;
