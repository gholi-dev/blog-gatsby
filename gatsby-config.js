/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `blog`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://wordpress-1eyviwq7z.iran.liara.run/me",
        schema: {
          perPage: 20,
          requestConcurrency: 5,
          previewRequestConcurrency: 2
        },
        html: {
          useGatsbyImage: false,
          createStaticFiles: false,
          generateWebpImages: false
        },
        type: {
          __all: {
            limit: process.env.NODE_ENV !== "production" ? 20 : null
          }
        }
      }
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass"
  ]
};
