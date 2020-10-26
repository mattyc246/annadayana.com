import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import styled from "styled-components";

const AboutWrapper = styled.div`
  width: 100%;
  padding: 0 5vw;
`;

const AboutSection = styled.div`
  margin: 1.5em auto;
  width: 100%;
  column-gap: 2.5em;
  column-count: 1;

  .item {
    width: 100%;
    margin: 0 0 2.5em;
    -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
    page-break-inside: avoid; /* Firefox */
    break-inside: avoid; /* IE 10+ */
  }

  @media only screen and (min-width: 740px) {
    column-count: 1;
  }

  h1 {
    font-weight: 200;
    font-size: 48px;
  }
`;

const StyledContent = styled.div`
  letter-spacing: 1px;
  text-align: justify;
`

const About = ({ data: { about } }) => {
  return (
    <Layout>
      <HelmetDatoCms seo={about.seoMetaTags} />
      <AboutWrapper>
        <AboutSection>
          {/* <Img
            className="item"
            durationFadeIn={1000}
            fluid={about.photo.fluid}
            alt={about.title}
          /> */}
          <div className="item">
            <h1>{about.title}</h1>
              <StyledContent
                dangerouslySetInnerHTML={{
                  __html: about.bioNode.childMarkdownRemark.html,
                }}
              ></StyledContent>
          </div>
        </AboutSection>
      </AboutWrapper>
    </Layout>
  );
};;

export default About

export const query = graphql`
         query AboutQuery {
           about: datoCmsAboutPage {
             seoMetaTags {
               ...GatsbyDatoCmsSeoMetaTags
             }
             title
             photo {
               fluid(
                 maxWidth: 600
                 imgixParams: { fm: "jpg", auto: "compress" }
               ) {
                 ...GatsbyDatoCmsSizes
               }
             }
             bioNode {
               childMarkdownRemark {
                 html
               }
             }
           }
         }
       `;
