import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ url, largeImage, description }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prevState => !prevState);
  return (
    <div>
      <img
        className={css.smallImage}
        src={url}
        alt={description}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeImage={largeImage}
          description={description}
          onClose={toggleModal}
        >
          <img src={largeImage} alt={description} />
        </Modal>
      )}
    </div>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
