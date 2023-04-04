import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function Categories() {
  const RecipeContext = useContext(ReceitasContext);
  const { categories } = RecipeContext;
  const maxCategories = 5;
  return (
    <div>
      {
        categories.slice(0, maxCategories).map((c) => (
          <button
            key={ c }
            type="button"
            data-testid={ `${c}-category-filter` }
          >
            {c}
          </button>
        ))
      }
    </div>
  );
}

export default Categories;
