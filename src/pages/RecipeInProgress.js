import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import HeaderDetails from '../components/details/HeaderDetails';
import IngredientsCheck from '../components/details/IngredientsCheck';
import { fetchDetails } from '../helpers/fetchRecipe';

function RecipeInProgress(props) {
  const { page, history } = props;
  const { match: { params: { id } } } = props;

  const [progress, setProgress] = useState([]);
  const [ytURL, setYtURL] = useState('');

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe, setCurRecipe } = RecipeContext;

  const getProgress = (curPage, idToSearch, setState) => {
    const searchResult = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setState(searchResult[curPage.toLowerCase()][idToSearch]);
  };

  useEffect(() => {
    fetchDetails(page, id, setCurRecipe);
    getProgress(page, id, setProgress);
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
      <IngredientsCheck progress={ progress } setProgress={ setProgress } />
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
