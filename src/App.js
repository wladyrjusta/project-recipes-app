import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import ReceitasProvider from './context/ReceitasProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import MealProgress from './pages/MealProgress';
import DrinkProgress from './pages/DrinkProgress';

function App() {
  return (
    <div>
      <Switch>
        <ReceitasProvider>
          <Route path="/drinks/:id-da-receita/in-progress" component={ DrinkProgress } />
          <Route path="/meals/:id-da-receita/in-progress" component={ MealProgress } />
          <Route path="/drinks/:id" component={ DrinkDetails } />
          <Route path="/meals/:id" component={ MealDetails } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/" component={ Login } />
        </ReceitasProvider>
      </Switch>
    </div>
  );
}

export default App;

// Inciando o Projeto
