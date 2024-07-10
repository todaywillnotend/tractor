import type { GatsbyConfig } from "gatsby";

require("dotenv").config();

const config: GatsbyConfig = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Трактор T-150`,
    siteUrl: process.env.GATSBY_FRONTEND_URL,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Т-150`,
        short_name: `Т-150`,
        start_url: `/`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.GATSBY_FRONTEND_URL,
        sitemap: `${process.env.GATSBY_FRONTEND_URL}/sitemap.xml`,
        policy: [
          {
            userAgent: "*",
            allow: ["/", "/catalog", "/photo", "/contacts"],
            disallow: ["/cart"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-yandex-metrica`,
      options: {
        trackingId: "97789513",
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        trackHash: true,
        webvisor: true,
      },
    },
  ],
};

export default config;
