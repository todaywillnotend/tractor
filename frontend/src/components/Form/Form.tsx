import React, { useState } from "react";
import ym from "react-yandex-metrika";
import cn from "classnames";
// @ts-ignore
import IconDone from "./../../images/icon-done.svg";

import * as styles from "./Form.module.scss";

type TFormData = {
  name?: string;
  email?: string;
  phone: string;
  message?: string;
  cart?: number[];
};

interface IForm {
  title?: string;
  subtitle?: string;
  message?: string;
  withMessage?: boolean;
  withEmail?: boolean;
  onSuccess?: () => void;
  cart?: number[];
}

export const Form: React.FC<IForm> = ({
  title,
  subtitle,
  message,
  withMessage = false,
  withEmail = true,
  onSuccess,
  cart = [],
}) => {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    email: "",
    phone: "",
    message: message || "",
    cart,
  });
  const [privacy, setPrivacy] = useState(true);

  const isButtonEnabled = Boolean(
    formData.phone.length >= 10 && formData.phone.length < 13 && privacy
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

    if (cart.length) {
      formattedFormData.cart = formData.cart;
    }

    try {
      const responseForm = await fetch(
        `${process.env.GATSBY_BACKEND_URL}/api/orders` as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GATSBY_BACKEND_TOKEN}`,
          },
          body: JSON.stringify({ data: formattedFormData }),
        }
      );
      const responseFormJson = await responseForm.json();
      const isOk =
        "data" in responseFormJson ? Boolean(responseFormJson?.data) : false;

      setIsSuccess(isOk);
      onSuccess?.();

      if (isOk) {
        ym("reachGoal", "formSended");
      }
    } catch (error) {
      alert("Произошла какая то ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {isSuccess ? (
            <div className={styles.success}>
              <img src={IconDone} alt="" />

              <span>{"Ваша заявка успешно отправлена"}</span>
            </div>
          ) : (
            <>
              <h3 className={styles.title}>{title ?? "Заявка"}</h3>
              <p className={styles.subtitle}>
                {subtitle ??
                  "Заполните форму и наш менеджер свяжется с Вами в ближайшее рабочее время."}
              </p>
              <div className={styles.subtitleDesktop}>
                {subtitle !== undefined
                  ? subtitle
                  : `Удобный способ связаться с нами это телефон, но если Вы не
                дозвонились или сейчас не рабочее время, то после заполнения
                формы, наш менеджер свяжется с Вами в ближайшее рабочее время.`}
              </div>

              <form className={styles.form} onSubmit={onSubmit}>
                {withEmail && (
                  <input
                    value={formData.email}
                    type="email"
                    placeholder="E-mail"
                    className={styles.input}
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
                  className={styles.input}
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
                  className={cn(styles.input, styles.inputRequired)}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: event.target?.value,
                    }))
                  }
                />
                {withMessage && (
                  <textarea
                    className={cn(styles.input, styles.textarea)}
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
                <label className={styles.privacy}>
                  <input
                    type="checkbox"
                    checked={privacy}
                    onClick={() => setPrivacy((prev) => !prev)}
                  />{" "}
                  Я даю согласие на обработку персональных данных в
                  соотстветствии с{" "}
                  <a
                    href="/privacy"
                    className={styles.privacyLink}
                    target="_blank"
                  >
                    Политикой&#160;конфиденциальности
                  </a>
                  .
                </label>
                <div className={styles.buttons}>
                  <button
                    type="submit"
                    className={styles.button}
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
