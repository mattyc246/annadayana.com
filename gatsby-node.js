const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsProject {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then((result) => {
      result.data.allDatoCmsProject.edges.map(({ node: project }) => {
        createPage({
          path: `projects/${project.slug}`,
          component: path.resolve(`./src/templates/project.js`),
          context: {
            slug: project.slug,
          },
        });
      });
      resolve();
    });
  });
};
