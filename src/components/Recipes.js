import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Recipecard from './Recipecard';
import ReceitasContext from '../context/ReceitasContext';

function Recipes({ page }) {
  const RecipeContext = useContext(ReceitasContext);
  const { recipes } = RecipeContext;
  const maxRecipes = 12;

  const keyValue = page === 'Meals' ? 'idMeal' : 'idDrink';
  const imgValue = page === 'Meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Meals' ? 'strMeal' : 'strDrink';

  return (
    <div>
      {
        recipes.slice(0, maxRecipes).map((r, i) => (<Recipecard
          key={ r[keyValue] }
          image={ r[imgValue] }
          name={ r[nameValue] }
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
