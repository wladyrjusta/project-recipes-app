import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const doneRecipes = [
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

const doneRecipeName1 = '1-horizontal-name';
const doneRecipeName0 = '0-horizontal-name';
const doneRecipeImg1 = '1-horizontal-image';
const doneRecipeImg0 = '0-horizontal-image';
const mealDetailsRote = '/meals/52771';
const drinkDetailsRote = '/drinks/178319';

localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes]));

describe('Testes da Página DoneRecipes', () => {
  const initialEntries = ['/done-recipes'];
  test('Teta se os cars de receitas vindos localStorage são renderizados corretamente', () => {
    renderWithRouter(<App />, { initialEntries });

    const doneRecipesHeader = screen.getByRole('heading', { name: 'Done Recipes' });
    expect(doneRecipesHeader).toBeVisible();

    const doneRecipesCards = screen.getAllByTestId(/-recipe-card/i);
    expect(doneRecipesCards).toHaveLength(2);

    const doneRecipeMealName = screen.getByTestId(doneRecipeName0);
    const doneRecipeDrinkName = screen.getByTestId(doneRecipeName1);
    const doneRecipeMealImg = screen.getByTestId(doneRecipeImg0);
    const doneRecipeDrinkImg = screen.getByTestId(doneRecipeImg1);

    expect(doneRecipeMealName).toBeVisible();
    expect(doneRecipeDrinkName).toBeVisible();
    expect(doneRecipeDrinkImg).toBeVisible();
    expect(doneRecipeMealImg).toBeVisible();
    expect(doneRecipeMealName.innerHTML).toBe('Spicy Arrabiata Penne');
    expect(doneRecipeDrinkName.innerHTML).toBe('Aquamarine');
  });
  test('Teta se os botões de filtro filtram as receitas por meals, drinsk, e all', () => {
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
    expect(screen.getByTestId(doneRecipeImg0)).toBeVisible();
    expect(screen.queryByTestId(doneRecipeName1)).not.toBeInTheDocument();

    userEvent.click(filterDrinksBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(1);
    expect(screen.getByTestId(doneRecipeImg0)).toBeVisible();
    expect(screen.queryByTestId(doneRecipeName1)).not.toBeInTheDocument();

    userEvent.click(filterAllBtn);
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(2);
  });
  test('Teta se no nome da receita meal, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeMealName = screen.getByTestId(doneRecipeName0);
    userEvent.click(doneRecipeMealName);
    const { pathname } = history.location;
    expect(pathname).toBe(mealDetailsRote);
  });
  test('Teta se na foto da receita meal, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeMealImg = screen.getByTestId(doneRecipeImg0);
    userEvent.click(doneRecipeMealImg);
    const { pathname } = history.location;
    expect(pathname).toBe(mealDetailsRote);
  });
  test('Teta se no nome da receita drink, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeDrinkName = screen.getByTestId(doneRecipeName1);
    userEvent.click(doneRecipeDrinkName);
    const { pathname } = history.location;
    expect(pathname).toBe(drinkDetailsRote);
  });
  test('Teta se na foto da receita drink, a rota muda para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    const doneRecipeDrinkImg = screen.getByTestId(doneRecipeImg1);
    userEvent.click(doneRecipeDrinkImg);
    const { pathname } = history.location;
    expect(pathname).toBe(drinkDetailsRote);
  });
});
