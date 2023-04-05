import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

export default function ReceitasProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [curCategory, setCurCategory] = useState('All');
  const [curRecipe, setCurRecipe] = useState({});

  const globalState = useMemo(() => ({
    recipes,
    setRecipes,
    categories,
    setCategories,
    curCategory,
    setCurCategory,
    curRecipe,
    setCurRecipe,
  }), [recipes, categories, curCategory, curRecipe]);

  return (
    <ReceitasContext.Provider value={ globalState }>
      { children }
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
