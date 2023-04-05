import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const arrayDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(arrayDoneRecipes
    && [...arrayDoneRecipes]);

  const handleFilterClic = (type = '') => {
    if (arrayDoneRecipes && arrayDoneRecipes.length > 0) {
      const filteredArrayDoneRecipes = arrayDoneRecipes
        .filter((recipe) => recipe.type.startsWith(type));

      setFilteredRecipes([...filteredArrayDoneRecipes]);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
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
          <DoneRecipeCard
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
          />
        ))}
    </div>
  );
}

export default DoneRecipes;
