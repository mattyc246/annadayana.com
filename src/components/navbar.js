import React from "react";
import { Link } from "gatsby";
import White from "../assets/images/white.png";
import Black from "../assets/images/black.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const Navigator = styled.header`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;

  @media screen and (min-width: 740px){
    justify-content: flex-start;
  }
`;

const FlexyLinks = styled.nav`
  margin-left: 3rem;
  display: none;

  a {
    color: black;
    font-weight: 300;
    font-size: 22px;
    margin-right: 3rem;
    text-decoration: none;
  }

  a:hover {
    opacity: 0.75;
  }

  a.active {
    opacity: 0.75;
  }

  @media screen and (min-width: 740px){
    display: block;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  opacity: 0.75;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  @media screen and (min-width: 740px){
    display: none;
  }
`

const StyledThemeSelector = styled(FontAwesomeIcon)`
  font-size: 24px;
  opacity: 0.75;
  display: none;
  margin-left: auto;
  :hover {
    opacity: 1;
    cursor: pointer;
  }

  @media screen and (min-width: 740px){
    display: block;
  }
`

const StyledLogo = styled(Link)`
  img {
    width: 80px;
    height: 80px;
  }
`;


const Navbar = ({setShowMenu, changeThemePref, themePref}) => {
  return (
    <Navigator>
      <StyledLogo to="/">
        <img src={themePref === 'dark' ? White : Black} alt="logo" />
      </StyledLogo>
      <FlexyLinks>
        <Link to="/" activeClassName="active">
          Work
        </Link>
        <Link to="/about" activeClassName="active">
          About
        </Link>
      </FlexyLinks>
      <StyledThemeSelector icon={themePref === 'dark' ? faSun : faMoon} onClick={() => changeThemePref()} />
      <StyledIcon icon={faBars} onClick={() => setShowMenu(true)} />
    </Navigator>
  );
};

export default Navbar;
