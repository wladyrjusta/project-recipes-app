import React from 'react';
import '../../App.css';
import PropTypes from 'prop-types';

function RecipeButton(props) {
  const { inProgress } = props;

  const name = inProgress ? 'Continue Recipe' : 'Start Recipe';

  return (
    <footer>
      <button className="footer" data-testid="start-recipe-btn">
        {name}
      </button>
    </footer>
  );
}

RecipeButton.propTypes = {
  inProgress: PropTypes.bool,
}.isRequired;

export default RecipeButton;
