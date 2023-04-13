import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';

import icon from '../images/shareIcon.svg';

function DoneRecipeCard(props) {
  const [linkCopied, setLinkCopied] = useState('');

  const handleClick = (type, id) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied('Link copied!');
  };

  const { index, image, name, categoria, date, tags, type, id } = props;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="done-recipes-card-container"
    >
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          className="done-recipes-img-container"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>
      <div className="done-recipes-infos-container">
        <Link
          to={ `/${type}s/${id}` }
        >
          <p
            data-testid={ `${index}-horizontal-name` }
            className="done-recipe-name"
          >
            { name }
          </p>
        </Link>

        <button
          className="done-recipe-btn"
          onClick={ () => handleClick(type, id) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            alt="share button"
            src={ icon }
          />
        </button>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="done-recipe-category"
        >
          { categoria }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
          className="done-recipe-date"
        >
          { date }
        </p>
        {
          tags && tags.map((tag, i) => (
            <p
              key={ `${tag}-${i}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className="done-recipe-tag"
            >
              {tag}
            </p>
          ))
        }
        <p
          data-testid="link-copied"
        >
          { linkCopied }
        </p>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  categoria: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default DoneRecipeCard;
