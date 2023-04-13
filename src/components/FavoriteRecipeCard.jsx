import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';

import '../styles/FavoritesRecipes.css';
import icon from '../images/shareIcon.svg';
import favorite from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard(props) {
  const [linkCopied, setLinkCopied] = useState('');

  const handleClick = (type, id) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied('Link copied!');
  };

  const { index, image, name, categoria, date, type, id, handleFavorite } = props;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="favorites-recipes-card-container"
    >
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          className="favorites-recipes-img-container"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>
      <div className="favorites-recipes-infos-container">
        <Link
          to={ `/${type}s/${id}` }
        >
          <p
            data-testid={ `${index}-horizontal-name` }
            className="favorites-recipe-name"
          >
            { name }
          </p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="favorites-recipe-category"
        >
          { categoria }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ date }</p>
        <p
          data-testid="link-copied"
        >
          { linkCopied }
        </p>
        <button
          className="favorites-recipe-btn"
          onClick={ () => handleClick(type, id) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            alt="share button"
            src={ icon }
          />
        </button>
        <button
          className="favorites-recipe-btn"
          onClick={ () => handleFavorite(id) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="share button"
            src={ favorite }
          />
        </button>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  categoria: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  id: PropTypes.string,
  type: PropTypes.string,
  handleFavorite: PropTypes.func,
}.isRequired;

export default FavoriteRecipeCard;
