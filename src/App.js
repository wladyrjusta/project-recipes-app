import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import ReceitasProvider from './context/ReceitasProvider';
import Meals from './pages/Meals';

function App() {
  return (
    <div>
      <Switch>
        <ReceitasProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
        </ReceitasProvider>
      </Switch>
    </div>
  );
}

export default App;

// Inciando o Projeto
