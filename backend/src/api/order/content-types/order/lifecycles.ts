function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const options = {
    day: "2-digit" as const,
    month: "2-digit" as const,
    year: "numeric" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    second: "2-digit" as const,
    hour12: false,
    timeZone: "Europe/Moscow",
  };

  const formattedDate = date.toLocaleString("en-GB", options);

  return formattedDate;
}

module.exports = {
  afterCreate: async ({ _result, params }) => {
    const data = params.data;

    if (data) {
      let text = `<h2>Новый заказ</h2><br>\n\n`;

      if (data?.name) {
        text += `<b>Имя:</b> ${data?.name}<br>\n`;
      }

      if (data?.phone) {
        text += `<b>Номер телефона:</b> ${data?.phone}<br>\n`;
      }

      if (data?.email) {
        text += `<b>Почта:</b> ${data?.email}<br>\n`;
      }

      if (data?.message) {
        text += `<b>Сообщение:</b> ${data?.message}<br>\n`;
      }

      if (data?.createdAt) {
        text += `<b>Дата и время:</b> ${formatDateTime(
          data?.createdAt
        )}<br>\n\n`;
      }

      if (data?.cart && data?.cart.length) {
        const cartItemsIds = data.cart || [];

        if (cartItemsIds.length) {
          text += `<b>Корзина: </b><br>\n`;

          const cartItems = await Promise.all(
            cartItemsIds.map((itemId) =>
              strapi.db.query("api::catalog.catalog").findOne({
                select: ["title"],
                where: { id: itemId },
              })
            )
          );

          cartItems.forEach(async (item, index) => {
            if (item?.title) {
              text += `${index + 1}) ${item?.title}<br>\n`;
            }
          });
        }
      }

      if (!text) return;

      try {
        console.log("Отправка сообщения в тг");
        await fetch(
          `${process.env.BACKEND_URL}/telegram-bot-strapi/send-message`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text.replace(/<[^>]*>/g, "") }),
          }
        );
      } catch (error) {
        console.error(error);
      }

      try {
        console.log("Отправка письма");
        await strapi.plugins["email"].services.email.send({
          from: "onboarding@resend.dev",
          to: process.env.RESEND_EMAIL,
          subject: "Новый заказ",
          html: text,
          text: text,
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
};
