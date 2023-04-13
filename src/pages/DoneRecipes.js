import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipesCard';
import Footer from '../components/Footer';

import '../styles/DoneRecipes.css';
import allRecipes from '../images/allRecipes.svg';
import allFood from '../images/allFood.png';
import allDrinks from '../images/allDrinks.png';

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

  const numer = 10;

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <div className="done-recipes-btn-category-container">
        <button
          className="done-recipes-btn-category"
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
          className="done-recipes-btn-category"
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
          className="done-recipes-btn-category"
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
          <DoneRecipeCard
            key={ index }
            index={ index }
            image={ recipe.image }
            name={ recipe.name }
            categoria={ `${recipe.nationality} - ${recipe.category} -
            ${recipe.alcoholicOrNot}` }
            date={ `Done in: ${recipe.doneDate.slice(0, numer)}` }
            tags={ recipe.tags }
            type={ recipe.type }
            id={ recipe.id }
          />
        ))}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
