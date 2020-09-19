import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  display: ${(props) => (props.showMenu ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  height: 100vh;
  width: 100vw;
  padding: 7.5vw;
  flex-direction: column;

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

const MobileMenu = ({ showMenu, setShowMenu }) => {
  return (
    <Overlay showMenu={showMenu}>
      <FontAwesomeIcon
        className="close"
        icon={faTimesCircle}
        onClick={() => setShowMenu(false)}
      />
      <Menu>
        <Link to="/" activeClassName="active">Work</Link>
        <Link to="/about" activeClassName="active">About</Link>
      </Menu>
    </Overlay>
  );
};

export default MobileMenu;
