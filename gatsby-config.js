require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN
      }
    },
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        prefix: 'annadayana',
        maxResults: 500
      }
    },
    {
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        // Add the `gatsbyImageData` resolver to `CloudinaryMedia`
        transformTypes: [`CloudinaryMedia`]
      }
    }
  ]
};
