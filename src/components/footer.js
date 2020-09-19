import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styled from "styled-components";

const PageFooter = styled.footer`
  width: 100vw;
  height: 20vh;
  padding: 1rem 7.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;


  small{
    font-weight: 200;
  }
`
const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  svg {
    margin: 0 1rem;
  }
`
const Footer = () => {
  return (
    <PageFooter>
      <SocialLinks>
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faLinkedin} />
      </SocialLinks>
      <small>2020 &copy; Anna Dayana</small>
    </PageFooter>
  )
}

export default Footer
