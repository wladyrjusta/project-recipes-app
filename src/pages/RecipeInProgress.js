import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import HeaderDetails from '../components/details/HeaderDetails';
import IngredientsCheck from '../components/details/IngredientsCheck';
import { fetchDetails } from '../helpers/fetchRecipe';

import '../styles/RecipeInProgress.css';

function RecipeInProgress(props) {
  const { page, history } = props;
  const { match: { params: { id } } } = props;

  // const [allIngredients, setAllIngredients] = useState([]);
  const [progress, setProgress] = useState([]);
  const [ytURL, setYtURL] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe, setCurRecipe } = RecipeContext;

  const getIngredients = () => {
    const regexIngr = /strIngredient/i;

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

  const getProgress = (curPage, idToSearch, setState) => {
    const searchResult = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (searchResult[curPage.toLowerCase()][idToSearch]) {
      setState(searchResult[curPage.toLowerCase()][idToSearch]);
    }
  };

  const finishRecipe = () => {
    const timeNow = new Date().toISOString();

    const doneRecipe = {
      id,
      type: page === 'Meals' ? 'meal' : 'drink',
      nationality: curRecipe.strArea || '',
      category: curRecipe.strCategory,
      alcoholicOrNot: curRecipe.strAlcoholic || '',
      name: curRecipe[`str${page === 'Meals' ? 'Meal' : 'Drink'}`],
      image: curRecipe[`str${page === 'Meals' ? 'Meal' : 'Drink'}Thumb`],
      doneDate: timeNow,
      tags: curRecipe.strTags ? curRecipe.strTags.split(',') : [],
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneRecipes = [...doneRecipes, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));

    history.push('/done-recipes');
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

    fetchDetails(page, id, setCurRecipe);
    getProgress(page, id, setProgress);
  }, []);

  useEffect(() => {
    if (curRecipe !== '' && page !== 'Drinks') {
      const youTubeURL = curRecipe.strYoutube.replace('watch?v=', 'embed/');
      setYtURL(youTubeURL);
    }
  }, [curRecipe]);

  const allIngredients = getIngredients();

  useEffect(() => {
    setIsDisabled((allIngredients.length !== progress.length) || progress.length === 0);
  });

  return (
    <div>
      <HeaderDetails page={ page } rId={ id } />
      <h1 className="recipe-in-progress-ingredients-title">Ingredients</h1>
      <IngredientsCheck
        page={ page }
        id={ id }
        progress={ progress }
        setProgress={ setProgress }
      />
      <h1 className="recipe-in-progress-instructions-title">Intructions</h1>
      <p
        data-testid="instructions"
        className="recipe-in-progres-instructions"
      >
        {curRecipe.strInstructions}
      </p>
      <h1 className="recipe-in-progress-instructions-video-title">Video</h1>
      {
        page === 'Meals' && (
          <iframe
            className="recipe-in-progress-instructions-video"
            title={ curRecipe.idMeal }
            width="420"
            height="315"
            src={ ytURL }
            data-testid="video"
          />
        )
      }
      <button
        className="recipe-in-progress-btn"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
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
