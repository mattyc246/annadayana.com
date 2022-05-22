import React, { useEffect } from "react";
import styled from "styled-components";

import Img from "gatsby-image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 0 1rem;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.9;
`;
const CloseWrap = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  padding-top: 3rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 200;
  z-index: 1;
`;
const ImagesWrapper = styled.div`
  margin: 1rem 0;
  margin-bottom: 2rem;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
`;

const ProjectModal = (props) => {
  const { handleClose, title, artworks } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <Overlay>
      <Background />
      <CloseWrap>
        <FontAwesomeIcon onClick={handleClose} icon={faTimes} />
      </CloseWrap>
      <Content>
        <ImagesWrapper>
          {title && <Title>{title}</Title>}
          {artworks?.map((artwork) => {
            console.log(artwork);
            return (
              <Img durationFadeIn={1000} fluid={artwork.fluid} alt={title} />
            );
          })}
        </ImagesWrapper>
      </Content>
    </Overlay>
  );
};

export default ProjectModal;
