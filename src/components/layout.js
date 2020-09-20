/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, {useState} from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/base.css";
import Navbar from "./navbar";
import MobileMenu from "./mobilemenu"
import Footer from "./footer";
import styled from "styled-components";

const Content = styled.main`
  width: 100%;
  min-height: 60vh;
  padding: 0 5vw;
`

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <Navbar setShowMenu={setShowMenu} />
          <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
          <Content>
            {children}
          </Content>
          <Footer />
        </>
      )}
    />
  );
};

export default TemplateWrapper;
