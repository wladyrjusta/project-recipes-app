import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import Recipes from '../components/Recipes';
import { fetchFirstRecipes,
  fetchCategories,
  fetchRecipesFromCategory } from '../helpers/fetchRecipe';
import Categories from '../components/Categories';

function Drinks(props) {
  const { history } = props;

  const RecipeContext = useContext(ReceitasContext);
  const { recipes, setRecipes, setCategories, curCategory } = RecipeContext;
  const isNull = recipes !== null;

  useEffect(() => {
    fetchFirstRecipes('Drinks', setRecipes);
    fetchCategories('Drinks', setCategories);
  }, []);

  useEffect(() => {
    if (curCategory === 'All') {
      fetchFirstRecipes('Drinks', setRecipes);
    } else {
      fetchRecipesFromCategory('Drinks', curCategory, setRecipes);
    }
  }, [curCategory]);

  useEffect(() => {
    if (!isNull) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipes.length === 1) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Drinks" search />
      <Categories />
      <div>
        {
          isNull && <Recipes page="Drinks" />
        }
      </div>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
