import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

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
      <button
        onClick={ () => handleFilterClic() }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterClic('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterClic('drink') }
      >
        Drinks
      </button>
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
