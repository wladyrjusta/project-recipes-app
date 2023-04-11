import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da página RecipeDetails', () => {
  const initialEntries = ['/drinks/178319'];
  const initialURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine';

  test('Testando o componente HeaderDetails', async () => {
    fetch(initialURL);

    renderWithRouter(<App />, { initialEntries });

    const recipePhoto = await screen.findByRole('img', { name: 'Aquamarine' });
    expect(recipePhoto).toBeVisible();
    expect(recipePhoto).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    const recipeTitle = await screen.findByRole('heading', { name: 'Aquamarine', level: 1 });
    expect(recipeTitle).toBeVisible();
    expect(recipeTitle.innerHTML).toBe('Aquamarine');

    const recipeCategory = await screen.findByRole('heading', { name: 'Cocktail Alcoholic', level: 2 });
    expect(recipeCategory).toBeVisible();
    expect(recipeCategory.innerHTML).toBe('Cocktail<span>Alcoholic</span>');

    const buttons = await screen.findAllByRole('button');

    expect(buttons[0]).toBeVisible();
    expect(buttons[0].innerHTML).toBe('<img data-testid="share-btn" alt="share button" src="shareIcon.svg">');
    const linkCopiedText = screen.queryByText('Link copied!');
    expect(linkCopiedText).not.toBeInTheDocument();
  });
  test('Testando o componente Ingredientse instruções', async () => {
    fetch(initialURL);

    renderWithRouter(<App />, { initialEntries });

    const igredientsNameAndMesure = await screen.findAllByTestId(/-ingredient-name-and-measure/);
    expect(igredientsNameAndMesure).toHaveLength(3);
    expect(igredientsNameAndMesure[0]).toHaveTextContent('Hpnotiq - 2 oz');
    expect(igredientsNameAndMesure[1]).toHaveTextContent('Pineapple Juice - 1 oz');
    expect(igredientsNameAndMesure[2]).toHaveTextContent('Banana Liqueur - 1 oz');

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toHaveTextContent('Shake well in a shaker with ice. Strain in a martini glass.');
  });
  test('Testando o componente Recomended', async () => {
    fetch(initialURL);

    renderWithRouter(<App />, { initialEntries });

    const recomendationCards = await screen.findAllByTestId(/-recommendation-card/);
    expect(recomendationCards).toHaveLength(6);
    expect(recomendationCards[0]).toHaveAttribute('href', '/meals/52977');
    expect(recomendationCards[1]).toHaveAttribute('href', '/meals/53060');
    expect(recomendationCards[2]).toHaveAttribute('href', '/meals/53065');
    expect(recomendationCards[3]).toHaveAttribute('href', '/meals/52978');
    expect(recomendationCards[4]).toHaveAttribute('href', '/meals/53026');
    expect(recomendationCards[5]).toHaveAttribute('href', '/meals/52785');
    const recomendationTitles = await screen.findAllByTestId(/-recommendation-title/);
    expect(recomendationTitles).toHaveLength(6);
    expect(recomendationTitles[0].innerHTML).toBe('Corba');
    expect(recomendationTitles[1].innerHTML).toBe('Burek');
    expect(recomendationTitles[2].innerHTML).toBe('Sushi');
    expect(recomendationTitles[3].innerHTML).toBe('Kumpir');
    expect(recomendationTitles[4].innerHTML).toBe('Tamiya');
    expect(recomendationTitles[5].innerHTML).toBe('Dal fry');
  });
  test('Testa se o botão de favortitar muda de icone após receita favoritada e se é capaz de salvar ou excluir a receita do localStorage chave favoriteRecipes', async () => {
    fetch(initialURL);

    renderWithRouter(<App />, { initialEntries });

    const buttons = await screen.findAllByRole('button');

    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipesStorage).toHaveLength(0);
    expect(await screen.findByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(buttons[1]);
    const recipesPos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(recipesPos).toHaveLength(1);
    expect(await screen.findByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(buttons[1]);
    const favoriteRecipesAfterUnlike = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipesAfterUnlike).toHaveLength(0);
  });

  test('Testa se o botão start Recipe direciona para tela de receita em progresso', async () => {
    fetch(initialURL);

    const { history } = renderWithRouter(<App />, { initialEntries });

    const startRecipeBtn = await screen.findByRole('button', { name: 'Start Recipe' });
    expect(startRecipeBtn).toBeVisible();
    userEvent.click(startRecipeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319/in-progress');
  });

  test('Testa se o componente iframe carrega o link do youtube', async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

    renderWithRouter(<App />, { initialEntries: ['/meals/52771/'] });

    const iframeElement = screen.getByTestId('video');

    expect(iframeElement).toBeInTheDocument();

    await waitFor(() => {
      expect(iframeElement).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
    }, {
      timeout: 2000,
    });
  });

  test('Testa se o componente tem o botao continue progress', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52771: ['penne rigate'] } }));

    renderWithRouter(<App />, { initialEntries: ['/meals/52771/'] });

    const continueButton = screen.getByRole('button', {
      name: /continue recipe/i,
    });

    expect(continueButton).toBeInTheDocument();
  });
});
