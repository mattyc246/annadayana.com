import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';

import '../styles/base.scss';
import Navbar from './navbar';
import MobileMenu from './mobilemenu';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false; /* eslint-disable import/first */

const Content = styled.main`
  width: 100%;
  min-height: 60vh;
  padding: 0 5vw;
`;

const SideFloat = styled.h2`
  display: none;
  position: fixed;
  top: 25%;
  right: 1.5vw;
  margin: 0;
  text-align: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 18px;
  font-weight: 300;

  @media screen and (min-width: 740px) {
    display: block;
  }
`;

const ScrollToTop = styled(FontAwesomeIcon)`
  position: fixed;
  bottom: 15px;
  left: 15px;
  font-size: 38px;
  opacity: ${(props) => (props.showScroll ? '0.8' : '0')};
  transition: opacity 500ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
  cursor: pointer;
`;

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [themePref, setThemePref] = useState('light');
  const [showScroll, setShowScroll] = useState(false);

  const changeThemePref = () => {
    if (themePref === 'light') {
      localStorage.setItem('themePref', 'dark');
      setThemePref('dark');
    } else {
      localStorage.setItem('themePref', 'light');
      setThemePref('light');
    }
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let storedTheme = localStorage.getItem('themePref');

    if (storedTheme) {
      setThemePref(storedTheme);
    }

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);

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
          allDatoCmsSocialProfile(sort: { position: ASC }) {
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
          <div
            className={themePref === 'dark' ? 'dark-wrapper' : 'light-wrapper'}
          >
            <SideFloat>Anna Dayana — Graphic Designer</SideFloat>
            <Navbar
              setShowMenu={setShowMenu}
              themePref={themePref}
              changeThemePref={changeThemePref}
            />
            <MobileMenu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              themePref={themePref}
              changeThemePref={changeThemePref}
            />
            <Content>{children}</Content>
            <ScrollToTop
              icon={faChevronUp}
              onClick={() => goToTop()}
              showScroll={showScroll}
            />
            <Footer />
          </div>
        </>
      )}
    />
  );
};

export default TemplateWrapper;
