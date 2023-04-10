import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../../context/ReceitasContext';
import '../../styles/IngredientCheck.css';

function IngredientsCheck(props) {
  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;

  const { page, id, progress, setProgress } = props;
  console.log(progress);

  const regexIngr = /strIngredient/i;
  const regexMeas = /strMeasure/i;

  const getIngredients = () => {
    const allData = Object.keys(curRecipe).map((c) => (
      { [c]: curRecipe[c] }
    ));

    const ingredientsData = allData.filter((d) => Object.keys(d)[0].match(regexIngr));

    const ingredientsRaw = ingredientsData.map((i) => ({
      strIngredient: i[Object.keys(i)[0]],
    }));

    return ingredientsRaw
      .filter((i) => i.strIngredient !== null && i.strIngredient !== '');
  };

  const getMeasure = () => {
    const allData = Object.keys(curRecipe).map((c) => (
      { [c]: curRecipe[c] }
    ));

    const measureData = allData.filter((d) => Object.keys(d)[0].match(regexMeas));

    const measureRaw = measureData.map((i) => ({
      strMeasure: i[Object.keys(i)[0]],
    }));

    return measureRaw.filter((i) => i.strMeasure !== '');
  };

  const ingredients = getIngredients();
  const measures = getMeasure();

  const verifyChecked = (item) => progress.some((i) => i === item);

  const manageIgredients = (item) => {
    const verify = progress.some((i) => i === item);

    if (verify) {
      const newIngredients = progress.filter((i) => i !== item);

      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes[page === 'Meals' ? 'meals' : 'drinks'][id] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

      setProgress(newIngredients);
    } else {
      const newIngredients = [...progress, item];

      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes[page === 'Meals' ? 'meals' : 'drinks'][id] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

      setProgress(newIngredients);
    }
  };

  return (
    <ul>
      {
        ingredients.map((i, index) => (
          <label
            key={ `${i.strIngredient}${index}` }
            htmlFor={ `${i.strIngredient}${index}` }
            data-testid={ `${index}-ingredient-step` }
            className={ verifyChecked(i.strIngredient) ? 'done' : '' }
          >
            <input
              id={ `${i.strIngredient}${index}` }
              type="checkbox"
              checked={ verifyChecked(i.strIngredient) }
              onChange={ () => manageIgredients(i.strIngredient) }
            />
            {i.strIngredient}
            {' '}
            {measures[index].strMeasure ? `- ${measures[index].strMeasure}` : ''}
          </label>
        ))
      }
    </ul>
  );
}

IngredientsCheck.propTypes = {
  page: PropTypes.arrayOf(String),
}.isRequired;

export default IngredientsCheck;
