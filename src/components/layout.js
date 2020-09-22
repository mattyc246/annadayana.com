/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, {useState, useEffect} from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/base.scss";
import Navbar from "./navbar";
import MobileMenu from "./mobilemenu"
import Footer from "./footer";
import styled from "styled-components";

const Content = styled.main`
  width: 100%;
  min-height: 60vh;
  padding: 0 5vw;
`

const SideFloat = styled.h2`
  display: none;
  position: fixed;
  top: 50%;
  right: 1.5vw;
  margin: 0;
  text-align: center;
  /* transform: rotate(90deg); */
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 18px;
  font-weight: 300;

  @media screen and (min-width: 740px){
    display: block;
  }
`;

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [themePref, setThemePref] = useState("light")

  const changeThemePref = () => {
    if(themePref === 'light'){
      localStorage.setItem('themePref', 'dark')
      setThemePref('dark')
    } else {
      localStorage.setItem('themePref', 'light')
      setThemePref('light')
    }
  }

  useEffect(() => {
    let storedTheme = localStorage.getItem('themePref')

    if(storedTheme){
      setThemePref(storedTheme)
    }
  }, [])

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
      render={(data) => (
        <>
        <HelmetDatoCms
          favicon={data.datoCmsSite.faviconMetaTags}
          seo={data.datoCmsHome.seoMetaTags}
        />
        <div className={themePref === 'dark' ? 'dark-wrapper' : 'light-wrapper'}>
          <SideFloat>Anna Dayana — Graphic Designer</SideFloat>
          <Navbar setShowMenu={setShowMenu} themePref={themePref} changeThemePref={changeThemePref}/>
          <MobileMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            themePref={themePref}
            changeThemePref={changeThemePref}
          />
          <Content>{children}</Content>
          <Footer />
        </div>
        </>
      )}
    />
  );
};

export default TemplateWrapper;
