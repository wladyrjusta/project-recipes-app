import React, { useContext, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function Login() {
  const RContext = useContext(ReceitasContext);
  const { teste } = RContext;
  console.log(teste);

  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="emailInput">
        Email
        <input
          id="emailInput"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="passwordInput">
        Senha
        <input
          id="passwordInput"
          type="password"
          value={ password }
          onChange={ (e) => setPassord(e.target.value) }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => console.log('ok') }
      >
        Login

      </button>
    </div>
  );
}

export default Login;
