/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Layer5 Recognition Program`,
    description: `Showcasing Your Achievements as a User and a Contributor`,
    siteUrl: `https://badges.layer5.io`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#3c494f",
        theme_color: "#00b39f",
        display: "minimal-ui",
        icon: "src/assets/images/recognition-program.png", // This path is relative to the root of the site.
      },
    },
  ],
}
