import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';

describe('Testes da componente header', () => {
  const searchDatatest = 'search-top-btn';
  const searchInputTxt = 'search-input';
  const execBtn = 'exec-search-btn';

  test('Testando se componentes estão no header', () => {
    const initialEntries = ['/meals'];

    renderWithRouter(<App />, { initialEntries });

    const headerTitle = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId(searchDatatest);

    expect(headerTitle.innerHTML).toBe('Meals');
    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTxt);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'teste');
  });

  test('Testando se componentes estão na searchBar e usa filtro por ingredientes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });

    const initialEntries = ['/meals'];

    renderWithRouter(<App />, { initialEntries });

    const searchIcon = screen.getByTestId(searchDatatest);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTxt);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(execBtn);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    const result = await screen.findAllByTestId(/recipe-card/i);
    expect(result).toHaveLength(10);
  });

  test('Testando se componentes estão na searchBar e usa filtro por nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(japaneseMeals),
    });

    const initialEntries = ['/meals'];

    renderWithRouter(<App />, { initialEntries });

    const searchIcon = screen.getByTestId(searchDatatest);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTxt);
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId(execBtn);

    expect(searchInput).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    const result = await screen.findAllByTestId(/recipe-card/i);
    expect(result).toHaveLength(5);
  });

  test('Testando se componentes estão na searchBar e usa filtro por primeira letra', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(breakfastMeals),
    });

    const initialEntries = ['/meals'];

    renderWithRouter(<App />, { initialEntries });

    const searchIcon = screen.getByTestId(searchDatatest);
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTxt);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(execBtn);

    expect(searchInput).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(searchInput, 'c');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    const result = await screen.findAllByTestId(/recipe-card/i);
    expect(result).toHaveLength(7);
  });
});
