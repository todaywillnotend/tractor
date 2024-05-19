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
  afterCreate: async ({ result }) => {
    console.log("result", result);

    if (result) {
      let text = `<h2>Новый заказ</h2><br>\n\n`;

      if (result?.name) {
        text += `<b>Имя:</b> ${result?.name}<br>\n`;
      }

      if (result?.phone) {
        text += `<b>Номер телефона:</b> ${result?.phone}<br>\n`;
      }

      if (result?.email) {
        text += `<b>Почта:</b> ${result?.email}<br>\n`;
      }

      if (result?.createdAt) {
        text += `<b>Дата и время:</b> ${formatDateTime(
          result?.createdAt
        )}<br>\n`;
      }

      if (!text) return;

      try {
        await strapi.plugins["email"].services.email.send({
          from: "onboarding@resend.dev",
          to: "todaywillnotend@gmail.com",
          subject: "Новый заказ",
          html: text,
          text: text,
        });

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
    }
  },
};
