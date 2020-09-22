import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import styled from 'styled-components'

const MasonryWrapper = styled.div`
  width: 100%;
`

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

const IndexPage = ({ data }) => {
  return  (
      <Layout>
        <MasonryWrapper>
          <Masonry>
            {
              data.allDatoCmsWork.edges.map((edge) => {
                const {node: {coverImage, id, title}} = edge
                return(
                  <Img key={id} className="item" durationFadeIn={1000} fluid={coverImage.fluid} alt={title} />
                )
              })
            }
          </Masonry>
        </MasonryWrapper>
      </Layout>
  );;
};;

export default IndexPage

export const query = graphql`
         query IndexQuery {
           allDatoCmsWork(sort: { fields: [position], order: ASC }) {
             edges {
               node {
                 id
                 title
                 coverImage {
                   fluid(
                     maxWidth: 450
                     imgixParams: { fm: "jpg", auto: "compress" }
                   ) {
                     ...GatsbyDatoCmsSizes
                   }
                 }
               }
             }
           }
         }
       `;
