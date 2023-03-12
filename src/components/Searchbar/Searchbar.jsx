import React, { useState } from 'react';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchData, setSearchData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchData(value);
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchData}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
