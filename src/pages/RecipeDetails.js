import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';

function RecipeDetails(props) {
  const { page } = props;
  const { match: { params: { id } } } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe, setCurRecipe } = RecipeContext;

  useEffect(() => {
    fetchDetails(page, id, setCurRecipe);
  }, []);

  return (
    <div>
      <h1>Detalhes</h1>
    </div>
  );
}

RecipeDetails.propTypes = {
  page: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
