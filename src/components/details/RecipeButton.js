import React from 'react';
import '../../App.css';
import PropTypes from 'prop-types';

function RecipeButton(props) {
  const { inProgress, history, id, page } = props;

  const name = inProgress ? 'Continue Recipe' : 'Start Recipe';

  return (
    <footer>
      <button
        className="footer"
        data-testid="start-recipe-btn"
        onClick={ () => {
          history.push(`/${page.toLowerCase()}/${id}/in-progress`);
        } }
      >
        {name}
      </button>
    </footer>
  );
}

RecipeButton.propTypes = {
  page: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  inProgress: PropTypes.bool,
  id: PropTypes.string,
}.isRequired;

export default RecipeButton;
