import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";

const ContactsPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
    </main>
  );
};

export default ContactsPage;

export const Head: HeadFC = () => <title>Контакты</title>;
