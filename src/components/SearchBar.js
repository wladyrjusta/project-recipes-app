import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipe } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';
import '../styles/Header.css';

function SearchBar(props) {
  const { title } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { setRecipes } = RecipeContext;

  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const [lastSearch, setLastSearch] = useState({ input: '', type: '' });

  useEffect(() => {
    fetchRecipe(title, lastSearch, setRecipes);
  }, [lastSearch]);

  return (
    <div className="search-bar-container">
      <input
        placeholder="Seach"
        className="input-searchbar-header"
        type="text"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
        data-testid="search-input"
      />
      <label htmlFor="ingredient-radio">
        <input
          className="checkbox-searchbar-header"
          id="ingredient-radio"
          type="radio"
          name="searchType"
          value="ingredient"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name-radio">
        <input
          className="checkbox-searchbar-header"
          id="name-radio"
          type="radio"
          name="searchType"
          value="name"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-radio">
        <input
          className="checkbox-searchbar-header"
          id="first-letter-radio"
          type="radio"
          name="searchType"
          value="first-letter"
          onChange={ (e) => setSearchType(e.target.value) }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        className="btn-searchbar-header"
        type="button"
        onClick={ () => setLastSearch({ input: searchInput, type: searchType }) }
        data-testid="exec-search-btn"
      >
        SEARCH

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
