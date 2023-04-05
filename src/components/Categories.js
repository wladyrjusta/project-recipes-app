import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function Categories() {
  const RecipeContext = useContext(ReceitasContext);
  const { categories, curCategory, setCurCategory } = RecipeContext;
  const maxCategories = 5;
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCurCategory('All') }
      >
        All
      </button>
      {
        categories.slice(0, maxCategories).map((c) => (
          <button
            key={ c }
            type="button"
            data-testid={ `${c}-category-filter` }
            onClick={ () => setCurCategory(curCategory === c ? 'All' : c) }
          >
            {c}
          </button>
        ))
      }
    </div>
  );
}

export default Categories;
