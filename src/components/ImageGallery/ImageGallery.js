import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ gallery }) {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map(item => {
        return (
          <li key={item.id}>
            <ImageGalleryItem
              url={item.webformatURL}
              description={item.tags}
              largeImage={item.largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
};
