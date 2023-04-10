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
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <ReceitasProvider>
          <Route
            exact
            path="/drinks/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } page="Drinks" /> }
          />
          <Route
            exact
            path="/meals/:id/in-progress"
            render={ (props) => <RecipeInProgress { ...props } page="Meals" /> }
          />
          <Route
            exact
            path="/drinks/:id"
            render={ (props) => <RecipeDetails { ...props } page="Drinks" /> }
          />
          <Route
            exact
            path="/meals/:id"
            render={ (props) => <RecipeDetails { ...props } page="Meals" /> }
          />
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
