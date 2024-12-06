import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Contacts } from "../components/Contacts/Contacts";
import { Footer } from "../components/Footer/Footer";
import { Repair } from "../components/Repair/Repair";

const RepairPage: React.FC<PageProps> = () => {
  return (
    <main className="mainWrapper">
      <Header />
      <Repair style={{ marginTop: 0 }} />
      <Contacts />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default RepairPage;

export const Head: HeadFC = () => (
  <>
    <title>ТракторСтрой - Капитальный ремонт Т-150</title>;
    <meta
      name="description"
      content="Обращайтесь к нашим специалистам для качественного восстановления техники. Мы гарантируем эффективное решение любых проблем и продлеваем срок службы ваших машин!"
    />
    <meta
      name="keywords"
      content="ремонт т-150, капитальный ремонт т-150, капитальный ремонт трактора хтз т-150, капитальный ремонт трактора хтз 150 в Волгоградской области, ремонт вашего трактор т-150 по всей Россиии, ремонт т 150, ремонт кабины т 150"
    />
    <meta
      property="og:title"
      content="ТракторСтрой - Капитальный ремонт Т-150"
    />
    <meta
      property="og:url"
      content={`${process.env.GATSBY_FRONTEND_URL}/repair`}
    />
    <meta
      property="og:image"
      content={`${process.env.GATSBY_FRONTEND_URL}/tractor.png`}
    />
    <meta
      property="og:description"
      content="Обращайтесь к нашим специалистам для качественного восстановления техники. Мы гарантируем эффективное решение любых проблем и продлеваем срок службы ваших машин!"
    />
  </>
);
