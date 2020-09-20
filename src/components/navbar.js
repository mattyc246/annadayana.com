import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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


const Navbar = ({setShowMenu}) => {
  return (
    <Navigator>
      <div
        style={{
          height: "55px",
          width: "55px",
          border: "1px solid black",
          textAlign: "center",
          padding: "5px",
        }}
      >
        Logo Here
      </div>
      <FlexyLinks>
        <Link to="/" activeClassName="active">
          Work
        </Link>
        <Link to="/about" activeClassName="active">
          About
        </Link>
      </FlexyLinks>
      <StyledIcon icon={faBars} onClick={() => setShowMenu(true)} />
    </Navigator>
  );
};

export default Navbar;
