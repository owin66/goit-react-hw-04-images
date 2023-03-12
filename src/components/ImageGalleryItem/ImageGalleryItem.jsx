import React from 'react';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => (
  <li className={css.galleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={css.galleryItem}
      onClick={() => onClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
