import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Recipecard from './Recipecard';
import ReceitasContext from '../context/ReceitasContext';

import '../styles/Recipes.css';

function Recipes({ page }) {
  const RecipeContext = useContext(ReceitasContext);
  const { recipes } = RecipeContext;
  const maxRecipes = 12;

  const keyValue = page === 'Meals' ? 'idMeal' : 'idDrink';
  const imgValue = page === 'Meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Meals' ? 'strMeal' : 'strDrink';
  const idValue = page === 'Meals' ? 'idMeal' : 'idDrink';

  return (
    <div className="recipes-main">
      {
        recipes.slice(0, maxRecipes).map((r, i) => (<Recipecard
          key={ r[keyValue] }
          image={ r[imgValue] }
          name={ r[nameValue] }
          url={ `/${page.toLowerCase()}/${r[idValue]}` }
          index={ i }
        />))
      }
    </div>
  );
}

Recipes.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Recipes;
