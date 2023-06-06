import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPhoto } from '../api/pixabayApi';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    searchQuery: '',
    isLoader: false,
    showBtn: false,
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      toast.info(`You are already watching "${searchQuery}"`);
      return;
    }
    this.setState({ searchQuery, gallery: [], page: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery, gallery } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoader: true });
        const { data } = await fetchPhoto(page, searchQuery);

        if (data.hits.length === 0) {
          this.setState({ showBtn: false });
          toast.info('Nothing was found for your request');
          return;
        }
        if (data.total > data.hits.length && data.total - page * 12 >= 0) {
          this.setState({ showBtn: true });
        }
        this.setState({ gallery: [...gallery, ...data.hits] });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  handleClickButton = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        showBtn: false,
      };
    });
  };

  render() {
    const { gallery, isLoader, showBtn } = this.state;
    return (
      <div className={css.App}>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}

        {isLoader && <Loader />}

        {showBtn && <Button onClick={this.handleClickButton} />}
      </div>
    );
  }
}
