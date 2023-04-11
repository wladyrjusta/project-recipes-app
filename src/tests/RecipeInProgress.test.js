import React from 'react';
import testLibrary, { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import oneDrink from '../../cypress/mocks/oneDrink';

const mealData = oneMeal.meals[0];

const initialEntries = ['/meals/52771/in-progress'];
const mealId = '52771';

const initialEntriesDrink = ['/drinks/178319/in-progress'];
const drinkId = '178319';

describe('Teste da tela de progresso', () => {
  test('Inicia recipe e verifica se foi redirecionado para tela de progresso', () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: [`/meals/${mealId}`] },
    );

    const startRecipe = screen.getByTestId('start-recipe-btn');

    expect(startRecipe).toBeInTheDocument();
    userEvent.click(startRecipe);
    expect(history.location.pathname).toEqual(initialEntries[0]);
  });

  test('Verifica se os ingredientes estao sendo renderizados', async () => {
    renderWithRouter(<App />, { initialEntries });

    let steps = [];

    await waitFor(() => {
      steps = [...Array(8).keys()].map((number) => (
        screen.getByTestId(`${number}-ingredient-step`)));
    }, {
      timeout: 2000,
    });

    steps.forEach((step) => expect(step).toBeInTheDocument());
  });

  test('Testa se os steps que foram clicados estao sendo armazenados, e somos redirecionados para done-recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    let steps = [];

    await waitFor(() => {
      steps = [...Array(8).keys()].map((number) => (
        screen.getByTestId(`${number}-ingredient-step`)));
    }, {
      timeout: 2000,
    });

    steps.forEach((step) => {
      userEvent.click(step);
    });

    const inProgressRecipesLocal = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = {
      drinks: {},
      meals: {
        52771: ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes', 'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano'],
      },
    };

    const finishButton = await screen.findByTestId('finish-recipe-btn');

    expect(finishButton).toBeEnabled();
    expect(JSON.stringify(inProgressRecipes)).toEqual(inProgressRecipesLocal);

    userEvent.click(finishButton);
    expect(history.location.pathname).toEqual('/done-recipes');
  });

  test('Testa se os steps que foram clicados estao sendo armazenados, e somos redirecionados para done-recipes', async () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: initialEntriesDrink },
    );

    let steps = [];

    await waitFor(() => {
      steps = [...Array(3).keys()].map((number) => (
        screen.getByTestId(`${number}-ingredient-step`)));
    }, {
      timeout: 2000,
    });

    steps.forEach((step) => {
      userEvent.click(step);
    });

    const finishButton = await screen.findByTestId('finish-recipe-btn');

    expect(finishButton).toBeEnabled();

    userEvent.click(finishButton);
    expect(history.location.pathname).toEqual('/done-recipes');
  });

  test('Verifica se o botao finish recipe esta desabilitado', async () => {
    renderWithRouter(<App />, { initialEntries });

    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toBeInTheDocument();
    expect(finishButton).toBeDisabled();
  });

  test('Testa se caso o localStorage esteja vazio, seja criado um vazio', () => {
    localStorage.clear();

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(doneRecipes).toBeNull();
    expect(inProgressRecipes).toBeNull();
    expect(favoriteRecipes).toBeNull();

    renderWithRouter(<App />, { initialEntries });

    const doneRecipesRender = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipesRender = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipesRender = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(doneRecipesRender).not.toBeNull();
    expect(inProgressRecipesRender).not.toBeNull();
    expect(favoriteRecipesRender).not.toBeNull();
  });
});
