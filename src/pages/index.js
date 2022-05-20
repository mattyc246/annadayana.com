import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import styled from "styled-components";
import Lightbox from "../components/lightbox";

const MasonryWrapper = styled.div`
  width: 100%;
`;

const Masonry = styled.div`
  margin: 1.5em auto;
  width: 100%;
  column-gap: 2.5em;
  column-count: 1;

  .item {
    width: 100%;
    background: #fff;
    margin: 0 0 2.5em;
    -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
    page-break-inside: avoid; /* Firefox */
    break-inside: avoid; /* IE 10+ */
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.4);

    :hover {
      cursor: pointer;
      opacity: 0.75;
      transition: opacity 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  }

  @media only screen and (min-width: 740px) {
    column-count: 2;
  }

  @media only screen and (min-width: 940px) {
    column-count: 3;
  }
`;

const InvisibleButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  padding-bottom: 0;
  margin: 0;
  height: 100%;
  appearance: none;
  outline: none;
  border: 0;
  background-color: transparent;
`;

const IndexPage = ({ data }) => {
  const [activeLightBox, setActiveLightBox] = useState(null);

  return (
    <Layout>
      <MasonryWrapper>
        <Masonry>
          {data.allDatoCmsWork.edges.map((edge, idx) => {
            const {
              node: { coverImage, id, title },
            } = edge;
            return (
              <Fragment key={id}>
                <InvisibleButton onClick={() => setActiveLightBox(idx)}>
                  <Img
                    className="item"
                    durationFadeIn={1000}
                    fluid={coverImage.fluid}
                    alt={title}
                  />
                </InvisibleButton>
                <Lightbox
                  active={activeLightBox === idx ? true : false}
                  setActiveLightBox={setActiveLightBox}
                  image={coverImage.fluid}
                  title={title}
                />
              </Fragment>
            );
          })}
        </Masonry>
      </MasonryWrapper>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
