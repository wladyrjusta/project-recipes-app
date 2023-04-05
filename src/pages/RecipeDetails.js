import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';
import HeaderDetails from '../components/details/HeaderDetails';
import Ingredients from '../components/details/Ingredients';

function RecipeDetails(props) {
  const { page } = props;
  const { match: { params: { id } } } = props;

  const [ytURL, setYtURL] = useState('');

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe, setCurRecipe } = RecipeContext;

  useEffect(() => {
    fetchDetails(page, id, setCurRecipe);
  }, []);

  useEffect(() => {
    if (curRecipe !== '' && page !== 'Drinks') {
      const youTubeURL = curRecipe.strYoutube.replace('watch?v=', 'embed/');
      setYtURL(youTubeURL);
    }
  }, [curRecipe]);

  return (
    <div>
      <HeaderDetails page={ page } />
      <Ingredients />
      <p data-testid="instructions">{curRecipe.strInstructions}</p>
      {
        page === 'Meals' && (
          <iframe
            title={ curRecipe.idMeal }
            width="420"
            height="315"
            src={ ytURL }
            data-testid="video"
          />
        )
      }

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
