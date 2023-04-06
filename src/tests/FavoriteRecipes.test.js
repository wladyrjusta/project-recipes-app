import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const favoriteRecipeName1 = '1-horizontal-name';
const favoriteRecipeName0 = '0-horizontal-name';
const favoriteRecipeImg1 = '1-horizontal-image';
const favoriteRecipeImg0 = '0-horizontal-image';
const mealDetailsRoute = '/meals/52771';
const drinkDetailsRoute = '/drinks/178319';

localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));

describe('Testes da Página FavoriteRecipes', () => {
  const initialEntries = ['/favorite-recipes'];
  test('Testa se os cars de receitas vindos localStorage são renderizados corretamente', () => {
    renderWithRouter(<App />, { initialEntries });

    const favoriteRecipesHeader = screen.getByRole('heading', { name: 'Favorite Recipes' });
    expect(favoriteRecipesHeader).toBeVisible();

    const favoriteRecipesCards = screen.getAllByTestId(/-recipe-card/i);
    expect(favoriteRecipesCards).toHaveLength(2);

    const favoriteRecipeMealName = screen.getByTestId(favoriteRecipeName0);
    const favoriteRecipeDrinkName = screen.getByTestId(favoriteRecipeName1);
    const favoriteRecipeMealImg = screen.getByTestId(favoriteRecipeImg0);
    const favoriteRecipeDrinkImg = screen.getByTestId(favoriteRecipeImg1);

    expect(favoriteRecipeMealName).toBeVisible();
    expect(favoriteRecipeDrinkName).toBeVisible();
    expect(favoriteRecipeDrinkImg).toBeVisible();
    expect(favoriteRecipeMealImg).toBeVisible();
    expect(favoriteRecipeMealName.innerHTML).toBe('Spicy Arrabiata Penne');
    expect(favoriteRecipeDrinkName.innerHTML).toBe('Aquamarine');
  });
  test('Testa se os botões de filtro filtram as receitas por meals, drinsk, e all', () => {
    renderWithRouter(<App />, { initialEntries });

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealsBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterAllBtn).toBeVisible();
    expect(filterMealsBtn).toBeVisible();
    expect(filterDrinksBtn).toBeVisible();

    const doneRecipesCards = screen.getAllByTestId(/-recipe-card/i);
    expect(doneRecipesCards).toHaveLength(2);

    userEvent.click(filterMealsBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(1);
    expect(screen.getByTestId(favoriteRecipeImg0)).toBeVisible();
    expect(screen.queryByTestId(favoriteRecipeName1)).not.toBeInTheDocument();

    userEvent.click(filterDrinksBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(1);
    expect(screen.getByTestId(favoriteRecipeImg0)).toBeVisible();
    expect(screen.queryByTestId(favoriteRecipeName1)).not.toBeInTheDocument();

    userEvent.click(filterAllBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(2);
  });
  test('Testa se no nome da receita meal, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeMealName = screen.getByTestId(favoriteRecipeName0);
    userEvent.click(doneRecipeMealName);
    const { pathname } = history.location;
    expect(pathname).toBe(mealDetailsRoute);
  });
  test('Testa se na foto da receita meal, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeMealImg = screen.getByTestId(favoriteRecipeImg0);
    userEvent.click(doneRecipeMealImg);
    const { pathname } = history.location;
    expect(pathname).toBe(mealDetailsRoute);
  });
  test('Testa se no nome da receita drink, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeDrinkName = screen.getByTestId(favoriteRecipeName1);
    userEvent.click(doneRecipeDrinkName);
    const { pathname } = history.location;
    expect(pathname).toBe(drinkDetailsRoute);
  });
  test('Testa se na foto da receita drink, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeDrinkImg = screen.getByTestId(favoriteRecipeImg1);
    userEvent.click(doneRecipeDrinkImg);
    const { pathname } = history.location;
    expect(pathname).toBe(drinkDetailsRoute);
  });

  test('Testa se ao clicar no botao de desfavoritar a receita nao esta mais no local storage', () => {
    renderWithRouter(<App />, { initialEntries });

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(recipes).toHaveLength(2);

    userEvent.click(favoriteBtn);

    const recipesPos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(recipesPos).toHaveLength(1);
  });
});
