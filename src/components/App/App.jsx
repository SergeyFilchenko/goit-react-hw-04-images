import s from './App.module.css';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MutatingDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import fetchImages from '../../Services/api';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isPending: false,
    isModalOpen: false,
    modalImg: '',
    modalAlt: '',
    isLoading: false,
    totalHits: null,
  };

  componentDidUpdate() {
    const { query, page, isPending } = this.state;
    if (isPending) {
      fetchImages(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            return (
              this.setState({ isPending: false }),
              toast(
                `Ypss!!! No results were found for "${query}", please edit your query.`,
                { position: 'top-center', hideProgressBar: true }
              )
            );
          }
          this.setState(prev => ({
            images: page > 1 ? [...prev.images, ...data.hits] : data.hits,
            isPending: false,
            totalHits: data.totalHits,
          }));
        })
        .catch(error => {
          console.log(error.massage);
        });
    }
  }

  handleSetQuery = ({ target: { name, value } }) => {
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast('enter your request please!', {
        position: 'top-center',
        hideProgressBar: true,
      });
    }
    this.setState({ page: 1, isPending: true });
  };

  handleTogleModal = (image, alt) => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
      modalImg: image,
      modalAlt: alt,
    }));
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1, isPending: true }));
  };

  render() {
    const {
      query,
      images,
      isPending,
      isModalOpen,
      modalImg,
      modalAlt,
      // isEnding,
      page,
      totalHits,
    } = this.state;
    const totalPage = totalHits / 12;
    const {
      handleSetQuery,
      handleSubmitForm,
      handleTogleModal,
      handleLoadMore,
    } = this;

    return (
      <div className={s.App}>
        <Searchbar
          query={query}
          handleSetQuery={handleSetQuery}
          handleSubmitForm={handleSubmitForm}
        />
        {images.length >= 1 && (
          <ImageGallery handleTogleModal={handleTogleModal} images={images} />
        )}
        {isPending && <MutatingDots ariaLabel="loading" />}
        {images.length >= 1 && totalPage > page && (
          <Button handleLoadMore={handleLoadMore} />
        )}
        )}
        {isModalOpen && (
          <Modal
            modalImg={modalImg}
            handleTogleModal={handleTogleModal}
            tag={modalAlt}
          />
        )}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
