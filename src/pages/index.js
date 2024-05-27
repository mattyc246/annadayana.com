import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Lightbox from '../components/lightbox';

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
    <MasonryWrapper>
      <Masonry>
        {data.allDatoCmsWork.edges.map((edge, idx) => {
          const {
            node: { coverImage, id, title }
          } = edge;
          const image = getImage(coverImage);
          return (
            <Fragment key={id}>
              <InvisibleButton onClick={() => setActiveLightBox(idx)}>
                <GatsbyImage
                  className="item"
                  image={image}
                  durationFadeIn={1000}
                  fluid={coverImage.fluid}
                  alt={title}
                />
              </InvisibleButton>
              <Lightbox
                active={activeLightBox === idx ? true : false}
                setActiveLightBox={setActiveLightBox}
                image={image}
                title={title}
              />
            </Fragment>
          );
        })}
      </Masonry>
    </MasonryWrapper>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { position: ASC }) {
      edges {
        node {
          id
          title
          coverImage {
            gatsbyImageData(width: 450, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
