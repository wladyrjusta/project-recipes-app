import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../styles/recipeDetail.css';

function RecomendationCard(props) {
  const { index, image, name, url } = props;

  return (
    <Link
      to={ url }
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        className="header-details-instructions-recomended-image"
        src={ image }
        alt={ name }
      />
      <p
        className="header-details-instructions-recomended-name"
        data-testid={ `${index}-recommendation-title` }
      >
        {name}
      </p>
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
