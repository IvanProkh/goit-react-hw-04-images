import React from 'react';
import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, openModal }) => {
  const imageOpen = e => {
    // console.log(items.find(item => item.id === Number(e.target.id)));

    const currentImage = items.find(item => item.id === Number(e.target.id));
    openModal(currentImage.largeImageURL, currentImage.tags);
  };

  return (
    <Gallery>
      {items.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          tags={tags}
          onClick={imageOpen}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.prototype = {
  items: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
