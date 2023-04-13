import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecomendationCard from './RecomendationCard';

import '../../styles/recipeDetail.css';

function Recomended(props) {
  const { page, recomendation } = props;

  const imgValue = page === 'Drinks' ? 'strMealThumb' : 'strDrinkThumb';
  const nameValue = page === 'Drinks' ? 'strMeal' : 'strDrink';
  const idValue = page === 'Drinks' ? 'idMeal' : 'idDrink';

  return (
    <Carousel interval={ null }>
      <Carousel.Item>
        <div className="rcomendation-carousel-container">
          <RecomendationCard
            index="0"
            image={ recomendation[0][imgValue] }
            name={ recomendation[0][nameValue] }
            url={ `/meals/${recomendation[0][idValue]}` }
          />
          <RecomendationCard
            index="1"
            image={ recomendation[1][imgValue] }
            name={ recomendation[1][nameValue] }
            url={ `/meals/${recomendation[1][idValue]}` }
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="rcomendation-carousel-container">
          <RecomendationCard
            index="2"
            image={ recomendation[2][imgValue] }
            name={ recomendation[2][nameValue] }
            url={ `/meals/${recomendation[2][idValue]}` }
          />
          <RecomendationCard
            index="3"
            image={ recomendation[3][imgValue] }
            name={ recomendation[3][nameValue] }
            url={ `/meals/${recomendation[3][idValue]}` }
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="rcomendation-carousel-container">
          <RecomendationCard
            index="4"
            image={ recomendation[4][imgValue] }
            name={ recomendation[4][nameValue] }
            url={ `/meals/${recomendation[4][idValue]}` }
          />
          <RecomendationCard
            index="5"
            image={ recomendation[5][imgValue] }
            name={ recomendation[5][nameValue] }
            url={ `/meals/${recomendation[5][idValue]}` }
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

Recomended.propTypes = {
  recomendation: PropTypes.arrayOf(Object),
}.isRequired;

export default Recomended;
