import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testes da página RecipeDetails', () => {
  test('Testando o componente HeaderDetails', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const initialEntries = ['/drinks/178319'];

    renderWithRouter(<App />, { initialEntries });

    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Aquamarine');

    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory).toHaveTextContent('Cocktail');
  });
});
