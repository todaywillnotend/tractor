import * as React from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const NotFoundPage: React.FC<PageProps> = () => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Перенаправляем на главную страницу через 5 секунд
    }, 5000);

    return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
  }, []);

  return (
    <main className="mainWrapper">
      <Header />
      <div style={{ padding: "10px" }}>
        <p>Похоже тут ничего нет)</p>
        <p>Через 5 секунд вернем Вас на главную</p>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>ТракторСтрой - 404</title>;
