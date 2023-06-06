import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { url, largeImage, description } = this.props;
    const { showModal } = this.state;
    return (
      <div>
        <img
          className={css.smallImage}
          src={url}
          alt={description}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeImage={largeImage}
            description={description}
            onClose={this.toggleModal}
          >
            <img src={largeImage} alt={description} />
          </Modal>
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
