import React from 'react';
import testLibrary, { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const mealData = oneMeal.meals[0];

const initialEntries = ['/meals/52771/in-progress'];
const mealId = '52771';

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
});
