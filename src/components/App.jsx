import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { queryPixabayAPI } from './services/pixabayApi';

export class App extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    query: '',
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    total: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImages(query, page);
    }
  }

  onChangeQuery = inputValue => {
    this.setState({
      query: inputValue,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const result = await queryPixabayAPI(query, page);

      if (result.hits.length === 0) {
        toast.error('No images found');
      }

      if (this.state.page === 1 && result.hits.length !== 0) {
        toast.success(`${result.total} images found`);
      }

      this.setState(prev => {
        return {
          images: [...prev.images, ...result.hits],
          total: result.total,
        };
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = largeImageURL => {
    this.toggleModal();
    console.log(largeImageURL);
    this.setState({ largeImageURL });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL, total } =
      this.state;
    const shouldRenderLoadMoreButton =
      images.length > 0 && !isLoading && total > images.length;
    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClick={this.openModal} />
        {isLoading && <Loader />}
        {shouldRenderLoadMoreButton && <Button onClick={this.handleLoadMore} />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {showModal && (
          <Modal show={showModal} onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" width="100%" height="100%" />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
