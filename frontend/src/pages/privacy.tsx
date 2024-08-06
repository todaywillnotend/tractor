import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Privacy } from "../components/Privacy/Privacy";


const PrivacyPage: React.FC<PageProps> = () => {
 return (
   <main className="mainWrapper">
     <Header />
    <Privacy />
     <div className="footerWrapper">
       <Footer />
     </div>
   </main>
 );
};

export default PrivacyPage;

export const Head: HeadFC = () => <title>ТракторСтрой - Политика конфиденциальности</title>;
