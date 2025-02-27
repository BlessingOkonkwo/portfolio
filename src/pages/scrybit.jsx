import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const photos = [
  {
    Component: () => (
      <StaticImage
        src="../images/scrybit/scrybit1.png"
        alt="Photo 1"
        placeholder="blurred"
        layout="constrained"
        width={150}
        height={150}
      />
    ),
    alt: 'Photo 1',
    fullSrc: '../images/scrybit/scrybit1.png',
  },
  {
    Component: () => (
      <StaticImage
        src="../images/scrybit/scrybit2.png"
        alt="Photo 2"
        placeholder="blurred"
        layout="constrained"
        width={150}
        height={150}
      />
    ),
    alt: 'Photo 2',
    fullSrc: '/images/scrybit/scrybit2.png',
  },
  {
    Component: () => (
      <StaticImage
        src="../images/scrybit/scrybit3.png"
        alt="Photo 3"
        placeholder="blurred"
        layout="constrained"
        width={150}
        height={150}
      />
    ),
    alt: 'Photo 3',
    fullSrc: '/images/scrybit/scrybit3.png',
  },
  {
    Component: () => (
      <StaticImage
        src="../images/scrybit/scrybit4.png"
        alt="Photo 4"
        placeholder="blurred"
        layout="constrained"
        width={150}
        height={150}
      />
    ),
    alt: 'Photo 4',
    fullSrc: '/images/scrybit/scrybit4.png',
  },
  {
    Component: () => (
      <StaticImage
        src="../images/scrybit/scrybit5.png"
        alt="Photo 5"
        placeholder="blurred"
        layout="constrained"
        width={150}
        height={150}
      />
    ),
    alt: 'Photo 5',
    fullSrc: '/images/scrybit/scrybit5.png',
  },
];

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
`;

const PhotoWrapper = styled.div`
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
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
  max-width: 80%;
  max-height: 80%;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
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

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = index => {
    setSelectedPhoto(photos[index].fullSrc);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const showPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[newIndex].fullSrc);
    setCurrentIndex(newIndex);
  };

  const showNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[newIndex].fullSrc);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <GalleryContainer>
        {photos.map((photo, index) => (
          <PhotoWrapper key={index} onClick={() => openModal(index)}>
            {photo.Component()}
          </PhotoWrapper>
        ))}
      </GalleryContainer>

      {selectedPhoto && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <LeftArrow onClick={showPrevious}>&#10094;</LeftArrow>
            <ModalImage src={selectedPhoto} alt="Selected" />
            <RightArrow onClick={showNext}>&#10095;</RightArrow>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PhotoGallery;
