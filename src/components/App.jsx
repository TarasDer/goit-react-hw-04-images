import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPhoto } from '../api/pixabayApi';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      toast.info(`You are already watching "${query}"`);
      return;
    }
    setSearchQuery(() => query);
    setGallery(() => []);
    setPage(() => 1);
  };
  useEffect(() => {
    if (searchQuery === '') return;

    async function fetch() {
      try {
        setIsLoader(() => true);
        const { data } = await fetchPhoto(page, searchQuery);
        setGallery(prevState => [...prevState, ...data.hits]);

        if (data.hits.length === 0) {
          setShowBtn(() => false);
          toast.info('Nothing was found for your request');
          return;
        }
        if (data.total > data.hits.length && data.total - page * 12 >= 0) {
          setShowBtn(() => true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(() => false);
      }
    }
    fetch();
  }, [searchQuery, page]);

  const handleClickButton = () => {
    setPage(state => state + 1);
    setShowBtn(() => false);
  };

  return (
    <div className={css.App}>
      <Searchbar handleFormSubmit={handleFormSubmit} />
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

      {showBtn && <Button onClick={handleClickButton} />}
    </div>
  );
}
