import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

import allmeals from '../styles/images/meals/all.svg';
import beef from '../styles/images/meals/beef.svg';
import breakfast from '../styles/images/meals/breakfast.svg';
import chicken from '../styles/images/meals/chicken.svg';
import dessert from '../styles/images/meals/dessert.svg';
import goat from '../styles/images/meals/goat.svg';

import alldrinks from '../styles/images/drinks/allDrink.svg';
import cocktail from '../styles/images/drinks/cocktail.svg';
import cocoa from '../styles/images/drinks/cocoa.svg';
import ordinary from '../styles/images/drinks/otherDrink.svg';
import other from '../styles/images/drinks/other.svg';
import shake from '../styles/images/drinks/shake.svg';

import '../styles/Categories.css';

const imgObject = {
  allmeals,
  beef,
  breakfast,
  chicken,
  dessert,
  goat,
  alldrinks,
  'ordinary drink': ordinary,
  cocktail,
  shake,
  'other / unknown': other,
  cocoa,
};

function Categories() {
  const RecipeContext = useContext(ReceitasContext);
  const { categories, curCategory, setCurCategory } = RecipeContext;
  const maxCategories = 5;
  const all = `all${window.location.pathname.substring(1)}`;

  return (
    <div className="category-main">
      <button
        className="category-btn-hidden"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCurCategory('All') }
      >
        <img src={ imgObject[all] } className="category-btn-img" alt="All" />
      </button>
      {
        categories.slice(0, maxCategories).map((c) => (
          <button
            className="category-btn-hidden"
            key={ c }
            type="button"
            data-testid={ `${c}-category-filter` }
            onClick={ () => setCurCategory(curCategory === c ? 'All' : c) }
          >
            <img
              key={ c }
              src={ imgObject[c.toLowerCase()] }
              className="category-btn-img"
              alt={ c }
            />
          </button>
        ))
      }
    </div>
  );
}

export default Categories;
