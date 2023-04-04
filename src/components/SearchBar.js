import React, { useState } from 'react';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');

  return (
    <div>
      <input
        type="text"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
        data-testid="search-input"
      />
      <label htmlFor="ingredient-radio">
        Ingredient
        <input
          id="ingredient-radio"
          type="radio"
          name="searchType"
          value="ingredient"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-radio">
        Name
        <input
          id="name-radio"
          type="radio"
          name="searchType"
          value="name"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-radio">
        First letter
        <input
          id="first-letter-radio"
          type="radio"
          name="searchType"
          value="first-letter"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        onClick={ () => console.log(searchType) }
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
