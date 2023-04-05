import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const drinksBottomBtn = 'drinks-bottom-btn';
const emailInputID = 'email-input';
const passwordInputID = 'password-input';
const loginInputID = 'login-submit-btn';
const profileTopBtnId = 'profile-top-btn';

const validEmail = 'teste@teste.com';

describe('Testes do componente Footer', () => {
  test('Teta se o componente é renderizado corretamente na rota /meals', () => {
    renderWithRouter(<App />);

    const emailloginInput = screen.getByTestId(emailInputID);
    const passwordInput = screen.getByTestId(passwordInputID);
    const loginBtn = screen.getByTestId(loginInputID);

    userEvent.type(emailloginInput, validEmail);
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    const profileRedirectBtn = screen.getByTestId(profileTopBtnId);
    userEvent.click(profileRedirectBtn);

    const footerDrinksBtn = screen.getByTestId(drinksBottomBtn);
    const footerMealsBtn = screen.getByTestId('meals-bottom-btn');
    const footerMealsIcon = screen.getByRole('img', { name: 'icone de comida' });
    const footerDrinksIcon = screen.getByRole('img', { name: 'icone de bebida' });

    expect(footerDrinksBtn).toBeInTheDocument();
    expect(footerMealsBtn).toBeInTheDocument();
    expect(footerMealsIcon).toBeInTheDocument();
    expect(footerDrinksIcon).toBeInTheDocument();
    expect(footerMealsIcon).toHaveProperty('src', 'http://localhost/mealIcon.svg');
    expect(footerDrinksIcon).toHaveProperty('src', 'http://localhost/drinkIcon.svg');
  });
  test('Teta se os icones do componente direcionam de forma correta para pagina página de /drinks', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const footerDrinksBtn = screen.getByTestId(drinksBottomBtn);
    expect(footerDrinksBtn).toBeInTheDocument();

    userEvent.click(footerDrinksBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const drinksHeader = screen.getByRole('heading', { name: 'Drinks' });
    expect(drinksHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });
  test('Teta se os icones do componente direcionam de forma correta para pagina página de /meals', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const footerMealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(footerMealsBtn).toBeInTheDocument();

    userEvent.click(footerMealsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const mealsHeader = screen.getByRole('heading', { name: 'Meals' });
    expect(mealsHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });
});
