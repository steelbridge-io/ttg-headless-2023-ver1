import React, { Fragment, useContext, useState, useEffect } from "react";
import { SEOContext } from 'gatsby-plugin-wpgraphql-seo';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from "react-helmet";
import { SearchContext } from "@/context/search-context";
import { MenuContext } from "@/context/menu-context";
import SearchPopup from "@/components/search-popup";
import PopupMenu from "@/components/popup-menu";
import { Link as ScrollLink } from "react-scroll";
import { useRouteMatch } from "react-router-dom";

import "typeface-oswald";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/css/animate.css";
import "@/css/font-awesome.min.css";
import "@/css/icons.css";
import "@/css/preset.css";
import "@/css/theme.css";
import "@/css/custom.css";
import "@/css/responsive.css";

const Layout = ({ template, PageTitle, PageDescription, children }) => {
  const { searchStatus } = useContext(SearchContext);
  const { menuStatus } = useContext(MenuContext);
  const [scrollTop, setScrollTop] = useState(false);

  const handleScrollTop = () => {
    if (window.scrollY > 70) {
      setScrollTop(true);
    } else if (window.scrollY < 70) {
      setScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [scrollTop]);

  const shouldRenderHelmet = template !== "templateWP";
  return (
   <SEOContext.Provider value={{ global: seo }}>
    <Fragment>
      {shouldRenderHelmet && (
      <Helmet>
        <title>{ `${ PageTitle }` }</title>
        <meta name='description' content={ `${ PageDescription }`} />
      </Helmet>
          )}
      <div id="wrapper">{children}</div>
      {true === searchStatus ? <SearchPopup /> : null}
      {true === menuStatus ? <PopupMenu /> : null}

      {scrollTop === true ? (
        <ScrollLink
          to="wrapper"
          smooth={true}
          duration={500}
          id="backToTop"
          className="scroll-to-top showit"
        >
          <i className="fa fa-angle-double-up"></i>
        </ScrollLink>
      ) : null}
    </Fragment>
   </SEOContext.Provider>
  );

  const {
  wp: { seo },
  } = useStaticQuery(graphql`
      query SiteInfoQuery {
          wp {
              seo {
                  contentTypes {
                      post {
                          title
                          schemaType
                          metaRobotsNoindex
                          metaDesc
                      }
                      page {
                          metaDesc
                          metaRobotsNoindex
                          schemaType
                          title
                      }
                  }
                  webmaster {
                      googleVerify
                      yandexVerify
                      msVerify
                      baiduVerify
                  }
                  schema {
                      companyName
                      personName
                      companyOrPerson
                      wordpressSiteName
                      siteUrl
                      siteName
                      inLanguage
                      logo {
                          sourceUrl
                          mediaItemUrl
                          altText
                      }
                  }
                  social {
                      facebook {
                          url
                          defaultImage {
                              sourceUrl
                              mediaItemUrl
                          }
                      }
                      instagram {
                          url
                      }
                      linkedIn {
                          url
                      }
                      mySpace {
                          url
                      }
                      pinterest {
                          url
                          metaTag
                      }
                      twitter {
                          username
                      }
                      wikipedia {
                          url
                      }
                      youTube {
                          url
                      }
                  }
              }
          }
      }
  `);
};

export default Layout;



