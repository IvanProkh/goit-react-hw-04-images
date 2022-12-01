import React from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, src, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryItemImage id={id} src={src} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
};
