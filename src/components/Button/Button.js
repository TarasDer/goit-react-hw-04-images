import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export function Button({ onClick }) {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
