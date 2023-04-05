import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const emailInputID = 'email-input';
const passwordInputID = 'password-input';
const loginInputID = 'login-submit-btn';
const profileTopBtnId = 'profile-top-btn';

const validEmail = 'teste@teste.com';

describe('Testes da Página Profile', () => {
  test('Teta se os componentes próprios da página são renderizado corretamente', () => {
    renderWithRouter(<App />);

    const emailloginInput = screen.getByTestId(emailInputID);
    const passwordInput = screen.getByTestId(passwordInputID);
    const loginBtn = screen.getByTestId(loginInputID);

    userEvent.type(emailloginInput, validEmail);
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

    const profileRedirectBtn = screen.getByTestId(profileTopBtnId);
    userEvent.click(profileRedirectBtn);

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    const profileEmailHeading = screen.getByTestId('profile-email');
    const profileDoneReciepsBtn = screen.getByTestId('profile-done-btn');
    const profileFavoritesReciepsBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileHeader).toBeVisible();
    expect(profileEmailHeading).toBeVisible();
    expect(profileDoneReciepsBtn).toBeVisible();
    expect(profileFavoritesReciepsBtn).toBeVisible();
    expect(profileLogoutBtn).toBeVisible();
  });
  test('Teta se o botão Done Recipes direcionam de forma correta para pagina página de /done-recipes', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const profileDoneReciepsBtn = screen.getByTestId('profile-done-btn');

    userEvent.click(profileDoneReciepsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    const doneRecipesHeader = screen.getByRole('heading', { name: 'Done Recipes' });
    expect(doneRecipesHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });
  test('Teta se o botão Favorite Recipes direcionam de forma correta para pagina página de /favorite-recipes', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const profileFavoritesReciepsBtn = screen.getByTestId('profile-favorite-btn');

    userEvent.click(profileFavoritesReciepsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');

    const doneRecipesHeader = screen.getByRole('heading', { name: 'Favorite Recipes' });
    expect(doneRecipesHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });
  test('Teta se o botão Logout direcionam de forma correta para pagina página home /', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(profileLogoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const doneRecipesHeader = screen.getByRole('heading', { name: 'Login' });
    expect(doneRecipesHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });
});
