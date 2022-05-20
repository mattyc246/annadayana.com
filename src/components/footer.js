import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { StaticQuery } from "gatsby";
import styled from "styled-components";

const PageFooter = styled.footer`
  width: 100vw;
  height: 20vh;
  padding: 1rem 7.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  small {
    font-weight: 200;
  }
`;
const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  svg {
    margin: 0 1rem;
  }
`;

const StyledSocialLink = styled.a`
  text-decoration: none;
  color: black;

  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const Footer = () => {
  const socialLinkIcons = [faFacebook, faInstagram, faEnvelope];
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          datoCmsHome {
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
        <PageFooter>
          <SocialLinks>
            {data.allDatoCmsSocialProfile.edges.map((profile, idx) => {
              return (
                <StyledSocialLink
                  key={idx}
                  href={profile.node.url}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={socialLinkIcons[idx]} />
                </StyledSocialLink>
              );
            })}
          </SocialLinks>
          <small>
            {new Date().getFullYear()} {data.datoCmsHome.copyright}
          </small>
        </PageFooter>
      )}
    />
  );
};

export default Footer;
