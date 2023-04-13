import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

import '../styles/FavoritesRecipes.css';
import allRecipes from '../images/allRecipes.svg';
import allFood from '../images/allFood.png';
import allDrinks from '../images/allDrinks.png';

function FavoriteRecipes() {
  const arrayFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(arrayFavoriteRecipes
    && [...arrayFavoriteRecipes]);

  const handleFilterClic = (type = '') => {
    if (arrayFavoriteRecipes && arrayFavoriteRecipes.length > 0) {
      const filteredArrayFavoriteRecipes = arrayFavoriteRecipes
        .filter((recipe) => recipe.type.startsWith(type));

      setFilteredRecipes([...filteredArrayFavoriteRecipes]);
    }
  };

  const handleFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = favorites.filter((recipe) => recipe.id !== id);
    setFilteredRecipes([...newFavorite]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <div className="favorites-recipes-btn-category-container">
        <button
          className="favorites-recipes-btn-category"
          onClick={ () => handleFilterClic() }
          data-testid="filter-by-all-btn"
        >
          <img
            className="done-recipes-image-category"
            src={ allRecipes }
            alt="icone de bebida"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          className="favorites-recipes-btn-category"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterClic('meal') }
        >
          <img
            className="done-recipes-image-category"
            src={ allFood }
            alt="icone de bebida"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          className="favorites-recipes-btn-category"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterClic('drink') }
        >
          <img
            className="done-recipes-image-category"
            src={ allDrinks }
            alt="icone de bebida"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
      { (filteredRecipes && filteredRecipes.length > 0)
        && filteredRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ index }
            index={ index }
            image={ recipe.image }
            name={ recipe.name }
            categoria={ `${recipe.nationality} - ${recipe.category} -
            ${recipe.alcoholicOrNot}` }
            date={ recipe.doneDate }
            tags={ recipe.tags }
            type={ recipe.type }
            id={ recipe.id }
            handleFavorite={ handleFavorite }
          />
        ))}
    </div>
  );
}

export default FavoriteRecipes;
