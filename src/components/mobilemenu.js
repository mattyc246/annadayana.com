import {
  faMoon,
  faSun,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  display: ${(props) => (props.showMenu ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  height: 100vh;
  width: 100vw;
  padding: 5vw;
  flex-direction: column;
  z-index: 999;

  .close {
    display: block;
    width: 36px;
    margin-left: auto;
    font-size: 36px;

    :hover {
      opacity: 0.75;
      cursor: pointer;
    }
  }

  @media screen and (min-width: 740px) {
    display: none;
  }
`;
const Menu = styled.nav`
  flex-grow: 1;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    color: black;
    font-weight: 700;
    font-size: 22px;
    margin-right: 3rem;
    text-decoration: none;
    margin: 2rem 0;
  }

  a:hover {
    opacity: 0.75;
  }

  a.active {
    opacity: 0.75;
  }
`;
const SideFloat = styled.h2`
  position: fixed;
  top: 25%;
  right: 3.5vw;
  margin: 0;
  text-align: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 18px;
  font-weight: 300;
`;
const StyledThemeSelector = styled(FontAwesomeIcon)`
  font-size: 28px;
  opacity: 0.75;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const MobileMenu = ({ showMenu, setShowMenu, changeThemePref, themePref }) => {
  return (
    <Overlay className="overlay" showMenu={showMenu}>
      <FontAwesomeIcon
        className="close"
        icon={faTimesCircle}
        onClick={() => setShowMenu(false)}
      />
      <SideFloat>Anna Dayana — Graphic Designer</SideFloat>
      <Menu>
        <Link to="/" activeClassName="active">
          Work
        </Link>
        <Link to="/about" activeClassName="active">
          About
        </Link>
        <Link to="/projects" activeClassName="active">
          Projects
        </Link>
      </Menu>
      <StyledThemeSelector
        icon={themePref === 'dark' ? faSun : faMoon}
        onClick={() => changeThemePref()}
      />
    </Overlay>
  );
};

export default MobileMenu;
