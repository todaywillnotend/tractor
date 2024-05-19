export default () => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: process.env.RESEND_API_KEY,
      },
      settings: {
        defaultFrom: "onboarding@resend.dev",
        defaultReplyTo: process.env.RESEND_EMAIL,
      },
    },
  },
});
