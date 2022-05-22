import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Link, graphql } from "gatsby";

import Img from "gatsby-image";

import Layout from "../components/layout";
import ProjectModal from "../components/projectmodal";

const SectionWrapper = styled.div`
  padding: 0 5vw;
`;
const Masonry = styled.div`
  margin: 1.5rem auto;
  width: 100%;
  column-gap: 2.5em;
  column-count: 1;

  @media only screen and (min-width: 740px) {
    column-count: 2;
  }

  @media only screen and (min-width: 940px) {
    column-count: 3;
  }
`;
const Item = styled.div`
  width: 100%;
  background: #fff;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid; /* IE 10+ */
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.4);
  position: relative;
`;
const ProjectTitleWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background-color: black;
  color: white;
  transition: opacity 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  cursor: pointer;

  :hover {
    opacity: 0.8;
    transition: opacity 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
`;
const ProjectTitle = styled.div`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

const Projects = ({ data }) => {
  const [activeModal, setActiveModal] = useState(null);

  const handleClickProject = (e, id) => {
    e.preventDefault();
    setActiveModal(id);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  return (
    <Layout>
      <SectionWrapper>
        <Masonry>
          {data.allDatoCmsProject.edges.map((edge) => {
            const {
              node: { coverImage, id, title, slug, artworks },
            } = edge;
            return (
              <Fragment key={id}>
                <Link
                  to={`/projects/${slug}`}
                  onClick={(e) => handleClickProject(e, id)}
                >
                  <Item>
                    <Img
                      className="item"
                      durationFadeIn={1000}
                      fluid={coverImage.fluid}
                      alt={title}
                    />
                    <ProjectTitleWrap>
                      <ProjectTitle>{title}</ProjectTitle>
                    </ProjectTitleWrap>
                  </Item>
                </Link>
                {activeModal === id && (
                  <ProjectModal
                    handleClose={handleClose}
                    title={title}
                    artworks={artworks}
                    isOpen={activeModal === id}
                  />
                )}
              </Fragment>
            );
          })}
        </Masonry>
      </SectionWrapper>
    </Layout>
  );
};

export default Projects;

export const query = graphql`
  query ProjectsQuery {
    allDatoCmsProject(sort: { fields: [id], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          artworks {
            fluid(
              maxWidth: 1000
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsSizes
            }
          }
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
