/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const slash = require(`slash`)
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@/data": path.resolve(__dirname, "src/data/index"),
                "@/components": path.resolve(__dirname, "src/components"),
                "@/context": path.resolve(__dirname, "src/context/"),
                "@/css": path.resolve(__dirname, "src/assets/css/"),
                "@/scss": path.resolve(__dirname, "src/assets/scss/"),
                "@/images": path.resolve(__dirname, "src/assets/images/"),
                "@/templates": path.resolve(__dirname, "src/templates/"),
            },
        },
    });
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    //const CategoryPage = path.resolve()
    //createRedirect({ fromPath: '/', toPath: '/', redirectInBrowser: true, isPermanent: true })
    return new Promise(async (resolve, reject) => {

        // ==== PAGES (WORDPRESS NATIVE) ====
        await graphql( ` {
                      allWpPage {
                        edges {
                          node {
                            id
                            slug
                            status
                            title
                            content
                            uri
                            template {
                              templateName
                              ... on WpDefaultTemplate {
                                templateName
                              }
                            }
                          }
                        }
                      }
                    }
        ` )
            .then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }
                const pageTemplate = path.resolve("./src/templates/page.js")

                _.each(result.data.allWpPage.edges, edge => {

                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: edge.node,
                    })
                })
            })
            // ==== END PAGES ====

            // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
            .then( async () => {
              await graphql( ` {
            allWpPost {
              edges {
                node {
                  id
                  title
                  slug
                  excerpt
                  content
                }
              }
            }
          } ` ).then(result => {
                    if (result.errors) {
                        console.log(result.errors)
                        reject(result.errors)
                    }
                    const postTemplate = path.resolve("./src/templates/post.js")
                    // We want to create a detailed page for each
                    // post node. We'll just use the WordPress Slug for the slug.
                    // The Post ID is prefixed with 'POST_'
                    _.each(result.data.allWpPost.edges, edge => {
                        createPage({
                            path: `/${edge.node.slug}/`,
                            component: slash(postTemplate),
                            context: edge.node,
                        })
                    })
                })
            })
            // ==== END POSTS ====
            // ==== BLOG POSTS ====
            .then( async () => {
              await graphql( ` {
                            allWpPost {
                              edges {
                                node {
                                  id
                                  title
                                  date(formatString: "MMM Do YYYY")
                                  excerpt
                                  slug
                                  featuredImage {
                                    node {
                                      altText
                                      sourceUrl
                                    }
                                  }
                                }
                              }
                            }
                          } 
                    ` ).then( async result => {
                    if (result.errors) {
                        console.log(result.errors)
                        reject(result.errors)
                    }
                    const posts = result.data.allWpPost.edges
                    const postsPerPage = 10
                    const numberOfPages = Math.ceil(posts.length / postsPerPage)
                    const blogPostListTemplate = path.resolve("./src/templates/blogPostList.js")

                    await Array.from( {length: numberOfPages}).forEach((page, index) => {
                        createPage({
                            component: slash(blogPostListTemplate),
                            path: index === 0 ? `/fishing-news` : `/fishing-news/${index + 1}`,
                            context: {
                                posts: posts.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
                                numberOfPages,
                                currentPage: index + 1
                            }
                        })
                    })

                    const archTemplate = path.resolve("./src/templates/archive.js")
                    _.each(posts, (post) => {
                        createPage({
                            path: `/fishing-news/${post.node.slug}`,
                            component: slash(archTemplate),
                            context: post.node
                        })
                    })

                  //resolve()
                })
            })
            .then( async () => {
               await graphql( ` {
        allWpReport {
          edges {
            node {
              id
              title
              date(formatString: "MMM Do YYYY")
              excerpt
              content
              slug
              featuredImage {
                node {
                  id
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      } ` ).then( async result => {
                    if (result.errors) {
                        console.log(result.errors)
                        reject(result.errors)
                    }
                    const posts = result.data.allWpReport.edges
                    const postsPerPage = 10
                    const numberOfPages = Math.ceil(posts.length / postsPerPage)
                    const blogPostListTemplate = path.resolve("./src/templates/reportPostList.js")

                   await Array.from({length: numberOfPages}).forEach((page, index) => {
                        createPage({
                            component: slash(blogPostListTemplate),
                            path: index === 0 ? `/fishing-report` : `/fishing-report/${index + 1}`,
                            context: {
                                posts: posts.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage),
                                numberOfPages,
                                currentPage: index + 1
                            }
                        })
                    })

                    const repTemplate = path.resolve("./src/templates/report-archive.js")
                    _.each(posts, (post) => {
                        createPage({
                            path: `/fishing-report/${post.node.slug}`,
                            component: slash(repTemplate),
                            context: post.node
                        })
                    })
                    //resolve()
                })
            }).then( async () => {
           await graphql( ` {
        allWpCategory {
          edges {
            node {
              name
              slug
            }
          }
        }
      } ` ).then( async result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }
                const Categories = result.data.allWpCategory.edges
                //const postsPerPage = 10
                //const numberOfPages = Math.ceil(Categories.length / postsPerPage)
                const CategoryPage = path.resolve("./src/templates/CategoryPage.js")

               await Categories.forEach( category => {
                    createPage({
                        path: `/category/${category.node.slug}`,
                        component: CategoryPage,
                        context: {
                            category: category.node.name
                        }
                    })
                })

               //resolve()

            })
        })
    })
}

