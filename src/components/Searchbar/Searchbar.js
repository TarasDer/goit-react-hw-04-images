import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from 'components/icons/8666693_search_icon.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = { inputValue: '' };

  handleInputChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.info('enter a phrase to search');
      return;
    }
    this.props.handleFormSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <SearchIcon />
          </button>

          <input
            className={css.searchFormInput}
            value={this.state.inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
