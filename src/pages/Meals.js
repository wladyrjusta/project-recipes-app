import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function Meals(props) {
  const { history } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { recipes } = RecipeContext;
  // console.log(recipes);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idMeal } = recipes[0];
      history.push(`/meals/${idMeal}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Meals" search />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Meals;
