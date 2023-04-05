import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../../context/ReceitasContext';

function HeaderDetails(props) {
  const { page } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;

  const imgValue = page === 'Meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Meals' ? 'strMeal' : 'strDrink';

  return (
    <div>
      <img
        src={ curRecipe[imgValue] }
        alt={ curRecipe[nameValue] }
        width="200px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{curRecipe[nameValue]}</h1>
      <h2 data-testid="recipe-category">
        {curRecipe.strCategory}
        {
          page === 'Drinks' && (
            <span>{curRecipe.strAlcoholic}</span>
          )
        }

      </h2>
    </div>
  );
}

HeaderDetails.propTypes = {
  page: PropTypes.string.isRequired,
};

export default HeaderDetails;
