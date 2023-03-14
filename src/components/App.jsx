import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { queryPixabayAPI } from './services/pixabayApi';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const result = await queryPixabayAPI(query, page);

        if (result.hits.length === 0) {
          toast.error('No images found');
        }

        if (page === 1 && result.hits.length !== 0) {
          toast.success(`${result.total} images found`);
        }

        setImages(prev => [...prev, ...result.hits]);
        setTotal(result.total);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (page !== 1 || query !== '') {
      fetchImages();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = url => {
    toggleModal();
    setLargeImageURL(url);
  };

  const onChangeQuery = inputValue => {
    setQuery(inputValue);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const shouldRenderLoadMoreButton =
    images.length > 0 && !isLoading && total > images.length;

  return (
    <div>
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={images} onClick={openModal} />
      {isLoading && <Loader />}
      {shouldRenderLoadMoreButton && <Button onClick={handleLoadMore} />}
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {showModal && (
        <Modal show={showModal} onClose={toggleModal}>
          <img src={largeImageURL} alt="" width="100%" height="100%" />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default App;
