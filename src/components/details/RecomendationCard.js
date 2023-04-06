import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomendationCard(props) {
  const { index, image, name, url } = props;

  return (
    <Link
      to={ url }
      data-testid={ `${index}-recommendation-card` }
    >
      <img src={ image } alt={ name } width="200px" />
      <p data-testid={ `${index}-recommendation-title` }>{name}</p>
    </Link>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default RecomendationCard;
