import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppBox } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImage } from '../api/searchApi';

export class App extends Component {
  state = {
    showModal: false,
    loading: false,
    showButton: false,
    query: '',
    currentPage: 1,
    images: [],
    largeImageData: {},
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.setState({ loading: true, showButton: true });

      try {
        await searchImage(query, currentPage).then(response => {
          if (response.totalHits === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({ showButton: false });
            return;
          }
          if (response.hits.length < 12) {
            toast.info(
              "We're sorry, but you've reached the end of search results."
            );
            this.setState({ showButton: false });
          }

          return this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            // showButton: true,
          }));
        });
        // .finally(() =>
        //   this.setState({
        //     loading: false,
        //   })
        // );
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleFormSubmit = search => {
    if (this.state.query === search.trim()) {
      return toast.info(
        'It looks like there are already pictures found for your request, please check if this will be a new search.'
      );
    }

    this.setState({
      images: [],
      query: search,
      currentPage: 1,
    });
  };

  toggleModal = (source, alt) => {
    this.setState(({ showModal }) => ({
      largeImageData: {
        source,
        alt,
      },
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { showModal, loading, showButton, images, largeImageData, error } =
      this.state;
    const { toggleModal, handleFormSubmit, loadMore } = this;

    return (
      <AppBox>
        {showModal && <Modal onClose={toggleModal} data={largeImageData} />}

        <Searchbar onSubmit={handleFormSubmit} />

        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <ImageGallery items={images} openModal={toggleModal} />

        {loading && <Loader />}

        {showButton && <Button onClick={loadMore} />}

        <ToastContainer autoClose={3000} theme="colored" />
      </AppBox>
    );
  }
}
