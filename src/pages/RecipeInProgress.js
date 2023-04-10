import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { fetchDetails } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';
import HeaderDetails from '../components/details/HeaderDetails';

function RecipeInProgress(props) {
  const { page, history } = props;
  const { match: { params: { id } } } = props;

  const [ytURL, setYtURL] = useState('');

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;

  //   useEffect(() => {
  //     const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //     const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //     const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  //     if (!doneRecipes) {
  //       localStorage.setItem('doneRecipes', JSON.stringify([]));
  //     }

  //     if (!inProgressRecipes) {
  //       localStorage.setItem('inProgressRecipes', JSON.stringify(
  //         { drinks: {}, meals: {} },
  //       ));
  //     }
  //     if (!favoriteRecipes) {
  //       localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     fetchDetails(page, id, setCurRecipe);
  //   }, []);

  useEffect(() => {
    if (curRecipe !== '' && page !== 'Drinks') {
      const youTubeURL = curRecipe.strYoutube.replace('watch?v=', 'embed/');
      setYtURL(youTubeURL);
    }
  }, [curRecipe]);

  return (
    <div>
      <HeaderDetails page={ page } rId={ id } />
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
      <footer>
        <button
          className="footer"
          data-testid="finish-recipe-btn"
          onClick={ () => {
            history.push('done/recipes');
          } }
        >
          Finish Recipe
        </button>
      </footer>
    </div>
  );
}

RecipeInProgress.propTypes = {
  page: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;
