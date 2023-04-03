import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da componente header', () => {
  test('Testando se componentes estão na página', () => {
    renderWithRouter(<Header title="Meals" search />, ['/meals']);

    const headerTitle = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(headerTitle.innerHTML).toBe('Meals');
    expect(headerTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'teste');
  });
});
