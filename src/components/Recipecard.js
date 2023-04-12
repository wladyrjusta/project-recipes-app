import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Recipes.css';

function Recipecard(props) {
  const { index, image, name, url } = props;
  return (
    <Link
      className="recipe-card"
      to={ url }
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ image } alt={ name } width="200px" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </Link>
  );
}

Recipecard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default Recipecard;
