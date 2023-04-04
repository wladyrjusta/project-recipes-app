import React from 'react';
import PropTypes from 'prop-types';

function Recipecard(props) {
  const { index, image, name } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Recipecard.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Recipecard;
