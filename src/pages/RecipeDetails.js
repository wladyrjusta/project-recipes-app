import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails, fetchRecomendation } from '../helpers/fetchRecipe';
import ReceitasContext from '../context/ReceitasContext';
import HeaderDetails from '../components/details/HeaderDetails';
import Ingredients from '../components/details/Ingredients';
import Recomended from '../components/details/Recomended';
import RecipeButton from '../components/details/RecipeButton';

import '../styles/recipeDetail.css';

function RecipeDetails(props) {
  const { page, history } = props;
  const { match: { params: { id } } } = props;

  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [recomendation, setRecomendation] = useState([]);
  const [ytURL, setYtURL] = useState('');

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe, setCurRecipe } = RecipeContext;

  const searchLocalStorage = (key, idToSearch, setState) => {
    const searchKey = JSON.parse(localStorage.getItem(key));
    const searchResult = searchKey.some((r) => r.id === idToSearch);
    setState(searchResult);
  };

  const searchInProgress = (idToSearch, setState) => {
    const searchKey = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const searchResult = Object.keys(searchKey[page.toLowerCase()])
      .some((i) => parseInt(i, 10) === parseInt(idToSearch, 10));
    setState(searchResult);
  };

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }

    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { drinks: {}, meals: {} },
      ));
    }
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    fetchDetails(page, id, setCurRecipe);
    fetchRecomendation(page, setRecomendation);
    searchLocalStorage('doneRecipes', id, setDone);
    searchInProgress(id, setInProgress);
  }, []);

  useEffect(() => {
    if (curRecipe !== '' && page !== 'Drinks') {
      const youTubeURL = curRecipe.strYoutube.replace('watch?v=', 'embed/');
      setYtURL(youTubeURL);
    }
  }, [curRecipe]);

  return (
    <div>
      <HeaderDetails page={ page } rId={ id } />
      <h1 className="header-details-ingredients-title">Ingredients</h1>
      <Ingredients />
      <h1 className="header-details-instructions-title">Intructions</h1>
      <p
        data-testid="instructions"
        className="header-details-instructions"
      >
        {curRecipe.strInstructions}
      </p>
      { curRecipe.idMeal
        && <h1 className="header-details-instructions-video-title">Video</h1> }
      {
        page === 'Meals' && (
          <iframe
            className="header-details-instructions-video"
            title={ curRecipe.idMeal }
            width="420"
            height="315"
            src={ ytURL }
            data-testid="video"
          />
        )
      }
      { recomendation.length > 0
       && <h1 className="header-details-instructions-recomended-title">Recomended</h1> }
      {
        recomendation.length > 0 && <Recomended
          page={ page }
          recomendation={ recomendation }
        />
      }
      {
        !done && <RecipeButton
          inProgress={ inProgress }
          history={ history }
          id={ id }
          page={ page }
        />
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
