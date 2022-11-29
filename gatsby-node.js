const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blog = await graphql(`
    {
      allWpPost {
        edges {
          node {
            id
            title
            slug

            modified
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 260) {
                      base64
                      aspectRatio
                      srcSet
                      sizes
                      src
                    }
                  }
                }
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                slug
                id
              }
            }
            date
            tags {
              nodes {
                name
                slug
                id
              }
            }
            categories {
              nodes {
                name
                slug
                id
              }
            }
            excerpt
            content
          }
          next {
            id
            title
            slug
          }
          previous {
            id
            title
            slug
          }
        }
        totalCount
      }
    }
  `);
  const programingData = await graphql(`
    {
      allWpPost(
        filter: {
          categories: { nodes: { elemMatch: { name: { eq: "برنامه‌نویسی" } } } }
        }
      ) {
        totalCount
      }
      allWpCategory(filter: { name: { eq: "برنامه‌نویسی" } }) {
        nodes {
          id
          slug
          name
        }
      }
    }
  `);
  const liaraUpdateDate = await graphql(`
    {
      allWpPost(
        filter: {
          categories: {
            nodes: { elemMatch: { name: { eq: "به‌روزرسانی‌های لیارا" } } }
          }
        }
      ) {
        totalCount
      }
      allWpCategory(filter: { name: { eq: "به‌روزرسانی‌های لیارا" } }) {
        nodes {
          id
          slug
          name
        }
      }
    }
  `);

  const postsPerPage = 12;
  const numPages = Math.ceil(blog.data.allWpPost.edges.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: path.resolve("./src/templates/blog.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        num: numPages,
        programingData,
        liaraUpdateDate,
        currentPage: i + 1,
        data: blog.data.allWpPost.edges.slice(
          i * postsPerPage,
          i * postsPerPage + postsPerPage
        )
      }
    });
  });
  blog.data.allWpPost.edges.forEach(post => {
    createPage({
      path: decodeURIComponent(`/blog/${post.node.slug}/`),
      component: require.resolve("./src/templates/post.js"),
      context: {
        post: post.node,
        prev: post.previous,
        next: post.next
      }
    });
  });

  // ------------------------
  // ******* category *******
  // ------------------------

  const category_slug = await graphql(`
    query MyQuery {
      allWpCategory {
        nodes {
          slug
          name
          id
        }
      }
    }
  `);

  await Promise.all(
    category_slug.data.allWpCategory.nodes.map(async node => {
      const category = await graphql(`
      {
        allWpPost(
          filter: { categories: { nodes: { elemMatch: { name: { eq: "${node.name}" } } } } }
        ) {
          nodes {
            title
            id
            content
            slug
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 260) {
                      base64
                      aspectRatio
                      srcSet
                      sizes
                      src
                    }
                  }
                }
              }
            }
            date
            excerpt
            categories {
                nodes {
                  name
                  slug
                  id
                }
              }
          }
          
        }
      }
    `);

      const numCategory = Math.ceil(
        category.data.allWpPost.nodes.length / postsPerPage
      );
      Array.from({ length: numCategory }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? decodeURIComponent(`/blog/category/${node.slug}`)
              : decodeURIComponent(`/blog/category/${node.slug}/page/${i + 1}`),
          component: path.resolve("./src/templates/sort.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            num: numCategory,
            currentPage: i + 1,
            key: "دسته",
            key_en: "category",
            node,
            data: category.data.allWpPost.nodes.slice(
              i * postsPerPage,
              i * postsPerPage + postsPerPage
            )
          }
        });
      });
    })
  );

  // ------------------------
  // ******* author *********
  // ------------------------

  const author_slug = await graphql(`
    query MyQuery {
      allWpUser {
        nodes {
          name
          id
          slug
        }
      }
    }
  `);

  await Promise.all(
    author_slug.data.allWpUser.nodes.map(async node => {
      const author = await graphql(`
      {
        allWpPost(
          filter: { author: { node: { name: { eq: "${node.name}" } } } }
        ) {
          nodes {
            title
            id
            slug
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 260) {
                      base64
                      aspectRatio
                      srcSet
                      sizes
                      src
                    }
                  }
                }
              }
            }
            excerpt
            content
            date
            categories {
              nodes {
                name
                slug
                id
              }
            }
          }
        }
      }
    `);

      const numAuthor = Math.ceil(
        author.data.allWpPost.nodes.length / postsPerPage
      );
      Array.from({ length: numAuthor }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? decodeURIComponent(`/blog/author/${node.slug}`)
              : decodeURIComponent(`/blog/author/${node.slug}/page/${i + 1}`),
          component: path.resolve("./src/templates/sort.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            num: numAuthor,
            currentPage: i + 1,
            key: "نویسنده",
            node,
            key_en: "author",
            data: author.data.allWpPost.nodes.slice(
              i * postsPerPage,
              i * postsPerPage + postsPerPage
            )
          }
        });
      });
    })
  );

  // ------------------------
  // ********* tag **********
  // ------------------------

  const tag_slug = await graphql(`
    {
      allWpTag {
        nodes {
          id
          name
          slug
        }
      }
    }
  `);

  await Promise.all(
    tag_slug.data.allWpTag.nodes.map(async node => {
      const tag = await graphql(`
        {
          allWpPost(filter: {tags: {nodes: {elemMatch: {name: {eq: "${node.name}"}}}}}) {
            nodes {
              title
              id
              excerpt
              featuredImage {
                node {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 260) {
                        base64
                        aspectRatio
                        srcSet
                        sizes
                        src
                      }
                    }
                  }
                }
              }
              content
              slug
              date
              categories {
                nodes {
                  name
                  slug
                  id
                }
              }
            }
          }
        }
    `);

      const numTag = Math.ceil(tag.data.allWpPost.nodes.length / postsPerPage);
      Array.from({ length: numTag }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? decodeURIComponent(`/blog/tag/${node.slug}`)
              : decodeURIComponent(`/blog/tag/${node.slug}/page/${i + 1}`),
          component: path.resolve("./src/templates/sort.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            num: numTag,
            currentPage: i + 1,
            key: "برچسب",
            key_en: "tag",
            node,
            data: tag.data.allWpPost.nodes.slice(
              i * postsPerPage,
              i * postsPerPage + postsPerPage
            )
          }
        });
      });
    })
  );
};
