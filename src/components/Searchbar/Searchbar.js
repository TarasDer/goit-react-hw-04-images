import { useState } from 'react';
import { ReactComponent as SearchIcon } from 'components/icons/8666693_search_icon.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export default function Searchbar({ handleFormSubmit }) {
  const [inputValue, setInputvalue] = useState('');

  const handleInputChange = event => {
    setInputvalue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.info('enter a phrase to search');
      return;
    }
    handleFormSubmit(inputValue);
    setInputvalue('');
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormButton}>
          <SearchIcon />
        </button>

        <input
          className={css.searchFormInput}
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
