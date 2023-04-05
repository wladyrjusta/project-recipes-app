const fetchRecipe = (page, lastSearch, setRecipes) => {
  if (page === 'Meals') {
    if (lastSearch.type === 'ingredient') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${lastSearch.input}`)
        .then((result) => result.json())
        .then((data) => setRecipes(data.meals));
    }
    if (lastSearch.type === 'name') {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${lastSearch.input}`)
        .then((result) => result.json())
        .then((data) => setRecipes(data.meals));
    }
    if (lastSearch.type === 'first-letter') {
      if (lastSearch.input.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${lastSearch.input}`)
        .then((result) => result.json())
        .then((data) => setRecipes(data.meals));
    }
  }
  if (lastSearch.type === 'ingredient') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${lastSearch.input}`)
      .then((result) => result.json())
      .then((data) => setRecipes(data.drinks));
  }
  if (lastSearch.type === 'name') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${lastSearch.input}`)
      .then((result) => result.json())
      .then((data) => setRecipes(data.drinks));
  }
  if (lastSearch.type === 'first-letter') {
    if (lastSearch.input.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lastSearch.input}`)
      .then((result) => result.json())
      .then((data) => setRecipes(data.drinks));
  }
};

const fetchFirstRecipes = (page, setRecipes) => {
  if (page === 'Meals') {
    return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((result) => result.json())
      .then((data) => setRecipes(data.meals));
  }
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then((data) => setRecipes(data.drinks));
};

const fetchCategories = (page, setCategories) => {
  if (page === 'Meals') {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json())
      .then((data) => setCategories(data.meals.map((c) => c.strCategory)));
  }
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((result) => result.json())
    .then((data) => setCategories(data.drinks.map((c) => c.strCategory)));
};

const fetchRecipesFromCategory = (page, category, setRecipes) => {
  if (page === 'Meals') {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => result.json())
      .then((data) => setRecipes(data.meals));
  }
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((result) => result.json())
    .then((data) => setRecipes(data.drinks));
};

const fetchDetails = (page, id, setCurRecipe) => {
  if (page === 'Meals') {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((result) => result.json())
      .then((data) => setCurRecipe(data.meals[0]));
  }
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((data) => setCurRecipe(data.drinks[0]));
};

export { fetchRecipe,
  fetchFirstRecipes,
  fetchCategories,
  fetchRecipesFromCategory,
  fetchDetails };
