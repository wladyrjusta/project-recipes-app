import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipe } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';

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
        onClick={ () => setLastSearch({ input: searchInput, type: searchType }) }
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
