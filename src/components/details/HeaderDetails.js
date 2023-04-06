import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import ReceitasContext from '../../context/ReceitasContext';
import icon from '../../images/shareIcon.svg';
// import blackFavorite from '../../images/blackHeartIcon.svg';
import whiteFavorite from '../../images/whiteHeartIcon.svg';

function HeaderDetails({ page, rId }) {
  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;
  console.log(curRecipe);

  const [linkCopied, setLinkCopied] = useState('');

  const imgValue = page === 'Meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Meals' ? 'strMeal' : 'strDrink';

  const handleClick = (pageName, recipeId) => {
    clipboardCopy(`http://localhost:3000/${pageName.toLowerCase()}/${recipeId}`);
    setLinkCopied('Link copied!');
  };

  const handleFavorite = (pageStr) => {
    const type = pageStr === 'Meals' ? 'Meal' : 'Drink';

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verify = favorites.some((recipe) => recipe.id === curRecipe.id);
    let newFavorite = [];
    if (verify) {
      newFavorite = favorites.filter((recipe) => recipe.id !== curRecipe.id);
    } else {
      newFavorite = [...favorites, {
        id: curRecipe[`id${type}`],
        type: type.toLocaleLowerCase(),
        nacionality: curRecipe.strArea ? curRecipe.strArea : '',
        category: curRecipe.strCategory,
        alcoholicOrNot: curRecipe.strAlcoholic ? curRecipe.strAlcoholic : '',
        name: curRecipe[`str${type}`],
        image: curRecipe[`str${type}Thumb`],

      }];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  return (
    <div>
      <img
        src={ curRecipe[imgValue] }
        alt={ curRecipe[nameValue] }
        width="200px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{curRecipe[nameValue]}</h1>
      <h2 data-testid="recipe-category">
        {curRecipe.strCategory}
        {
          page === 'Drinks' && (
            <span>{curRecipe.strAlcoholic}</span>
          )
        }
      </h2>
      <button
        onClick={ () => handleClick(page, rId) }
      >
        <img
          data-testid="share-btn"
          alt="share button"
          src={ icon }
        />
      </button>
      <button
        onClick={ () => handleFavorite() }
      >
        <img
          data-testid="favorite-btn"
          alt="share button"
          src={ whiteFavorite }
        />
      </button>
      <p>{linkCopied}</p>
    </div>
  );
}

HeaderDetails.propTypes = {
  page: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default HeaderDetails;
