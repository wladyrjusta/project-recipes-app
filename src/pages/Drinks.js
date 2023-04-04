import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function Drinks(props) {
  const { history } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { recipes } = RecipeContext;
  console.log(recipes);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Drinks" search />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
