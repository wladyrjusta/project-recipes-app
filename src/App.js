import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import ReceitasProvider from './context/ReceitasProvider';

function App() {
  return (
    <div>
      <Switch>
        <ReceitasProvider>
          <Route exact path="/" component={ Login } />
        </ReceitasProvider>
      </Switch>
    </div>
  );
}

export default App;

// Inciando o Projeto
