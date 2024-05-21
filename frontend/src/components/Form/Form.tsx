import React, { useState } from "react";

import "./Form.scss";

type TFormData = {
  name?: string;
  email?: string;
  phone: string;
  message?: string;
};

interface IForm {
  title?: string;
  subtitle?: string;
  withMessage?: boolean;
  withEmail?: boolean;
  onCloseClick?: () => void;
}

export const Form: React.FC<IForm> = ({
  title,
  subtitle,
  withMessage = false,
  withEmail = true,
  onCloseClick,
}) => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isButtonEnabled = Boolean(
    formData.phone.length >= 10 && formData.phone.length < 13
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!formData.phone) return;

    const formattedFormData: TFormData = {
      phone: formData.phone,
    };

    if (withEmail && formData.email) {
      formattedFormData.email = formData.email;
    }

    if (formData.name) {
      formattedFormData.name = formData.name;
    }

    if (withMessage && formData.message) {
      formattedFormData.message = formData.message;
    }

    try {
      const responseForm = await fetch(
        `${process.env.BACKEND_URL}/api/orders` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
          },
          body: JSON.stringify({ data: formattedFormData }),
        }
      );
      const responseFormJson = await responseForm.json();
      const isOk =
        "data" in responseFormJson ? Boolean(responseFormJson?.data) : false;

      setIsSuccess(isOk);
    } catch (error) {
      alert("Произошла какая то ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="form">
      <div className="form__container">
        <div className="form__content">
          {isSuccess ? (
            <div className="form__success">
              <img src="/icon-success.svg" alt="" />

              <span>{"Ваша заявка успешно отправлена"}</span>
            </div>
          ) : (
            <>
              <h3 className="form__title">{title || "Заявка"}</h3>
              <p className="form__subtitle">
                {subtitle ||
                  "Заполните форму и наш менеджер свяжется с Вами в ближайшее рабочее время."}
              </p>
              <div className="form__subtitle_desktop">
                {subtitle ||
                  `Удобный способ связаться с нами это телефон, но если Вы не
                дозвонились или сейчас не рабочее время, то после заполнения
                формы, наш менеджер свяжется с Вами в ближайшее рабочее время.`}
              </div>

              <form className="form__form" onSubmit={onSubmit}>
                {withEmail && (
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
                )}
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
                {withMessage && (
                  <textarea
                    className="form__input form__textarea"
                    placeholder="Сообщение"
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: event.target?.value,
                      }))
                    }
                  >
                    {formData.message}
                  </textarea>
                )}
                <div className="form__buttons">
                  {onCloseClick && (
                    <button
                      type="submit"
                      className="form__button"
                      onClick={onCloseClick}
                    >
                      Отмена
                    </button>
                  )}
                  <button
                    type="submit"
                    className="form__button"
                    disabled={!isButtonEnabled}
                  >
                    {isLoading ? "Загрузка..." : "Отправить"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
