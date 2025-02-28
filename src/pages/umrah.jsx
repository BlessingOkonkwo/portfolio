/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 20px;
  background-color: #0a192f;
`;

const PhotoWrapper = styled.div`
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }

  & > div {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const ModalImage = styled(GatsbyImage)`
  width: 100%;
  width: auto;
  max-width: 90vw;
  height: auto;
  border-radius: 5px;
  max-height: 90vh;
  object-fit: contain;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  cursor: pointer;
  user-select: none;
`;

const LeftArrow = styled(Arrow)`
  left: -40px;
`;

const RightArrow = styled(Arrow)`
  right: -40px;
`;

const PhotoGallery = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { absolutePath: { regex: "/content/umrah/" } }) {
        nodes {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
          name
        }
      }
    }
  `);

  const photos = data.allFile.nodes.map((node, index) => ({
    image: getImage(node.childImageSharp.gatsbyImageData),
    alt: `Photo ${index + 1}`,
  }));

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = index => {
    setSelectedPhoto(photos[index].image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const showPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[newIndex].image);
    setCurrentIndex(newIndex);
  };

  const showNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[newIndex].image);
    setCurrentIndex(newIndex);
  };

  return (
    <Layout location={location}>
      <Helmet title="Umrah" />

      <main>
        <header>
          <h1 className="big-heading">UmrahCash</h1>
          <p className="subtitle">
            Screenshots of the pages of UmrahCash Admin dashboard application. Tap on an image to expand
          </p>
        </header>

        <GalleryContainer>
          {photos.map((photo, index) => (
            <PhotoWrapper key={index} onClick={() => openModal(index)}>
              <GatsbyImage image={photo.image} alt={photo.alt} />
            </PhotoWrapper>
          ))}
        </GalleryContainer>

        {selectedPhoto && (
          <Modal onClick={closeModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <LeftArrow onClick={showPrevious}>&#10094;</LeftArrow>
              <ModalImage image={selectedPhoto} alt="Selected" />
              <RightArrow onClick={showNext}>&#10095;</RightArrow>
            </ModalContent>
          </Modal>
        )}
      </main>
    </Layout>
  );
};

PhotoGallery.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PhotoGallery;
