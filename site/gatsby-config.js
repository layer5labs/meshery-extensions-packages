/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Layer5 Recognition Program`,
    description: `Showcasing Your Achievements as a User and a Contributor`,
    siteUrl: `https://badges.layer5.io`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
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
        icon: "src/assets/images/5-light-bg.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PDTVCLXM",

        // // Include GTM in development.
        // //
        // // Defaults to false meaning GTM will only be loaded in production.
        // includeInDevelopment: false,

        // // datalayer to be set before GTM is loaded
        // // should be an object or a function that is executed in the browser
        // //
        // // Defaults to null
        // defaultDataLayer: { platform: "gatsby" },

        // // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // // Name of the event that is triggered
        // // on every Gatsby route change.
        // //
        // // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
        // // Defaults to false
        // enableWebVitalsTracking: true,
        // // Defaults to https://www.googletagmanager.com
        // selfHostedOrigin: "YOUR_SELF_HOSTED_ORIGIN",
      },
    },
  ],
};
