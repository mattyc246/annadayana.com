import React from "react";
import styled from "styled-components/macro";

import { graphql } from "gatsby";

import Img from "gatsby-image";

import Layout from "../components/layout";

const SectionWrapper = styled.div`
  padding: 0 5vw;
`;
const Title = styled.h1`
  font-weight: 200;
  font-size: 2rem;
`;
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const ImagesWrapper = styled.div`
  margin: 1rem 0;
  margin-bottom: 2rem;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
`;

const Project = ({ data }) => {
  const {
    datoCmsProject: { title, artworks },
  } = data;
  return (
    <Layout>
      <SectionWrapper>
        <Content>
          <ImagesWrapper>
            {title && <Title>{title}</Title>}
            {artworks?.map((artwork) => {
              return (
                <Img
                  key={artwork?.fluid?.base64}
                  durationFadeIn={1000}
                  fluid={artwork.fluid}
                  alt={title}
                />
              );
            })}
          </ImagesWrapper>
        </Content>
      </SectionWrapper>
    </Layout>
  );
};

export default Project;

export const query = graphql`
  query PageQuery($slug: String) {
    datoCmsProject(slug: { eq: $slug }) {
      title
      artworks {
        fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
