import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import Recipecard from '../components/Recipecard';

function Drinks(props) {
  const { history } = props;
  const maxRecipes = 12;

  const RecipeContext = useContext(ReceitasContext);
  const { recipes } = RecipeContext;
  // console.log(recipes);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Drinks" search />
      <div>
        {
          recipes.slice(0, maxRecipes).map((r, i) => (<Recipecard
            key={ r.idDrink }
            image={ r.strDrinkThumb }
            name={ r.strDrink }
            index={ i }
          />))
        }
      </div>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
