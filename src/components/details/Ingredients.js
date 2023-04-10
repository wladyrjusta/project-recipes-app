import React, { useContext } from 'react';
import ReceitasContext from '../../context/ReceitasContext';

function Ingredients() {
  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;

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

  return (
    <ul>
      {
        ingredients.map((i, index) => (
          <li
            key={ `${i.strIngredient}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {i.strIngredient}
            {' '}
            {measures[index].strMeasure ? `- ${measures[index].strMeasure}` : ''}

          </li>
        ))
      }
    </ul>
  );
}

export default Ingredients;
