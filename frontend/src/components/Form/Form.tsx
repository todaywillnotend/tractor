import React, { useState } from "react";

import "./Form.scss";

type TFormData = {
  name: string;
  email: string;
  phone: string;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    email: "",
    phone: "",
  });

  const isButtonEnabled = Boolean(
    formData.phone.length >= 10 && formData.phone.length < 13
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.phone) return;

    try {
      const responseForm = await fetch(
        `${process.env.BACKEND_URL}/api/orders` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      const responseFormJson = await responseForm.json();
      const isOk =
        "data" in responseFormJson ? Boolean(responseFormJson?.data) : false;

      setIsSuccess(isOk);
    } catch (error) {
      alert("Произошла какая то ошибка");
    }
  };

  return (
    <section className="form">
      <div className="form__container">
        <div className="form__content">
          <h3 className="form__title">Заявка</h3>
          {isSuccess ? (
            <div className="form__success">
              <img src="/icon-success.svg" alt="" />

              <span>Ваша заявка успешно отправлена</span>
            </div>
          ) : (
            <>
              <p className="form__subtitle">
                Заполните форму и наш менеджер свяжется с Вами в ближайшее
                рабочее время.
              </p>
              <div className="form__subtitle_desktop">
                Удобный способ связаться с нами это телефон, но если Вы не
                дозвонились или сейчас не рабочее время, то после заполнения
                формы, наш менеджер свяжется с Вами в ближайшее рабочее время.
              </div>

              <form className="form__form" onSubmit={onSubmit}>
                <input
                  value={formData.email}
                  type="email"
                  placeholder="E-mail"
                  className="form__input"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: event.target?.value,
                    }))
                  }
                />
                <input
                  value={formData.name}
                  type="text"
                  placeholder="Ваше имя"
                  className="form__input"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: event.target?.value,
                    }))
                  }
                />
                <input
                  value={formData.phone}
                  type="tel"
                  placeholder="Контактный телефон"
                  className="form__input"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: event.target?.value,
                    }))
                  }
                />
                <button
                  type="submit"
                  className="form__button"
                  disabled={!isButtonEnabled}
                >
                  Отправить
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
