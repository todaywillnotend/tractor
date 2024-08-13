import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Contacts } from "../components/Contacts/Contacts";
import { Footer } from "../components/Footer/Footer";
import { Leasing } from "../components/Leasing/Leasing";

const ContactsPage: React.FC<PageProps> = () => {
  return (
    <main className="mainWrapper">
      <Header />
      <Leasing style={{ marginTop: 0 }} />
      <Contacts />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default ContactsPage;

export const Head: HeadFC = () => (
  <>
    <title>ТракторСтрой - Лизинг</title>;
    <meta
      name="description"
      content="У нас выгодные условия по лизингу. 
      Мы сотрудничаем с самыми крупными и основными лизинговыми компаниями России."
    />
    <meta
      name="keywords"
      content="купить сельхозтехнику в лизинг, лизинт тракторов, сельскохозяйственная техника в лизинг, магазин сельхозтехники в лизинг, t-150 в лизинг, т-150 в лизинг, Т 150 трактор в лизинг"
    />
    <meta property="og:title" content="ТракторСтрой - Лизинг" />
    <meta
      property="og:url"
      content={`${process.env.GATSBY_FRONTEND_URL}/leasing`}
    />
    <meta
      property="og:image"
      content={`${process.env.GATSBY_FRONTEND_URL}/tractor.png`}
    />
    <meta
      property="og:description"
      content="У нас выгодные условия по лизингу. 
      Мы сотрудничаем с самыми крупными и основными лизинговыми компаниями России."
    />
  </>
);
