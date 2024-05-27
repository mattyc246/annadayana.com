import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

const Overlay = styled.div`
  display: ${(props) => (props.active === true ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;

  .image-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
  }
`;

const Lightbox = ({ active, image, title, setActiveLightBox }) => {
  return (
    <Overlay active={active} onClick={() => setActiveLightBox(null)}>
      <GatsbyImage
        className="image-container"
        loading="lazy"
        image={image}
        alt={title}
        imgStyle={{ objectFit: 'contain' }}
      />
    </Overlay>
  );
};

export default Lightbox;
