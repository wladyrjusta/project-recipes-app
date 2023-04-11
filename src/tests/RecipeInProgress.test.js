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

  test('Testa se os steps que foram clicados estao sendo armazenados', async () => {
    renderWithRouter(<App />, { initialEntries });

    let steps = [];

    await waitFor(() => {
      steps = [...Array(4).keys()].map((number) => (
        screen.getByTestId(`${number}-ingredient-step`)));
    }, {
      timeout: 2000,
    });

    steps.forEach((step) => {
      userEvent.click(step);
    });

    const inProgressRecipesLocal = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = { drinks: {}, meals: { 52771: ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes'] } };

    expect(JSON.stringify(inProgressRecipes)).toEqual(inProgressRecipesLocal);
  });

  test('Testa se ao completar uma receita, a pagina e redirecionada', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries });

    let steps = [];

    await waitFor(() => {
      steps = [...Array(8).keys()].map((number) => (
        screen.getByTestId(`${number}-ingredient-step-btn`)));
      steps.forEach((step) => step.click());
    }, {
      timeout: 1000,
    });

    await waitFor(() => {
      const finishButton = screen.getByTestId('finish-recipe-btn');
      userEvent.click(finishButton);
      expect(finishButton).toBeDisabled();
    }, {
      timeout: 1000,
    });
  });
});
