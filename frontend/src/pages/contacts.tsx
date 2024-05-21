import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Contacts } from "../components/Contacts/Contacts";
import { Footer } from "../components/Footer/Footer";

const ContactsPage: React.FC<PageProps> = () => {
  return (
    <main className="mainWrapper">
      <Header />
      <Contacts />
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default ContactsPage;

export const Head: HeadFC = () => <title>Контакты</title>;
