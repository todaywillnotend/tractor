import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Header } from "../components/Header/Header";

const IndexPage: React.FC<PageProps> = () => {
  React.useEffect(() => {
    console.log(`${process.env.BACKEND_URL}/api/catalogs`);
    fetch(`${process.env.BACKEND_URL}/api/catalogs` as string, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
      },
    })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <Header />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Главная</title>;
