import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import ReceitasContext from '../../context/ReceitasContext';
import icon from '../../images/shareIcon.svg';
import blackFavorite from '../../images/blackHeartIcon.svg';
import whiteFavorite from '../../images/whiteHeartIcon.svg';
import '../../styles/recipeDetail.css';

import allMeals from '../../styles/images/meals/all.svg';
import beef from '../../styles/images/meals/beef.svg';
import breakfast from '../../styles/images/meals/breakfast.svg';
import chicken from '../../styles/images/meals/chicken.svg';
import dessert from '../../styles/images/meals/dessert.svg';
import goat from '../../styles/images/meals/goat.svg';

import allDrinks from '../../styles/images/drinks/allDrink.svg';
import cocktail from '../../styles/images/drinks/cocktail.svg';
import cocoa from '../../styles/images/drinks/cocoa.svg';
import ordinary from '../../styles/images/drinks/otherDrink.svg';
import other from '../../styles/images/drinks/other.svg';
import shake from '../../styles/images/drinks/shake.svg';

const imgObject = {
  allMeals,
  beef,
  breakfast,
  chicken,
  dessert,
  goat,
  allDrinks,
  'ordinary drink': ordinary,
  cocktail,
  shake,
  'other / unknown': other,
  cocoa,
};

function HeaderDetails({ page, rId }) {
  const RecipeContext = useContext(ReceitasContext);
  const { curRecipe } = RecipeContext;

  const [linkCopied, setLinkCopied] = useState('');
  const [favoritesLocal, setFavoritesLocal] = useState([]);

  const whichIcon = favoritesLocal
    .some((recipe) => recipe.id === curRecipe[`id${
      page === 'Meals' ? 'Meal' : 'Drink'}`]);
  const imgValue = page === 'Meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Meals' ? 'strMeal' : 'strDrink';

  const handleClick = (pageName, recipeId) => {
    clipboardCopy(`http://localhost:3000/${pageName.toLowerCase()}/${recipeId}`);
    setLinkCopied('Link copied!');
  };

  const handleFavorite = (pageStr) => {
    const type = pageStr === 'Meals' ? 'Meal' : 'Drink';

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verify = favorites.some((recipe) => recipe.id === curRecipe[`id${type}`]);
    let newFavorite = [];
    if (verify) {
      newFavorite = favorites.filter((recipe) => recipe.id !== curRecipe[`id${type}`]);
    } else {
      newFavorite = [...favorites, {
        id: curRecipe[`id${type}`],
        type: type.toLocaleLowerCase(),
        nationality: curRecipe.strArea ? curRecipe.strArea : '',
        category: curRecipe.strCategory,
        alcoholicOrNot: curRecipe.strAlcoholic ? curRecipe.strAlcoholic : '',
        name: curRecipe[`str${type}`],
        image: curRecipe[`str${type}Thumb`],

      }];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavoritesLocal(newFavorite);
  };

  useEffect(() => {
    setFavoritesLocal(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  return (
    <div className="header-detail-container">
      <img
        src={ curRecipe[imgValue] }
        alt={ curRecipe[nameValue] }
        width="200px"
        data-testid="recipe-photo"
        className="header-detail-recipe-img"
      />
      <h1
        data-testid="recipe-title"
        className="header-detail-title"
      >
        {curRecipe[nameValue]}
      </h1>
      <img
        src={ curRecipe
           && imgObject[curRecipe.strCategory
             .toLowerCase()] ? imgObject[curRecipe.strCategory
            .toLowerCase()] : imgObject[`all${page}`] }
        alt={ curRecipe.strCategory }
        className="header-detail-image-category"
      />
      <p
        data-testid="recipe-category"
        className="header-detail-recipe-category"
      >
        {curRecipe.strCategory}
      </p>
      {
        page === 'Drinks' && (
          <span className="header-detail-alcoholic">{curRecipe.strAlcoholic}</span>
        )
      }
      <button
        onClick={ () => handleClick(page, rId) }
        className="header-detail-btn-share"
      >
        <img
          data-testid="share-btn"
          alt="share button"
          src={ icon }
        />
      </button>
      <button
        onClick={ () => handleFavorite(page) }
        className="header-detail-btn-favorite"
      >
        <img
          data-testid="favorite-btn"
          alt="share button"
          src={ whichIcon ? blackFavorite : whiteFavorite }
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
