import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/Login.css';
import tomateImg from '../styles/images/tomatetomate.svg';
import recipesImg from '../styles/images/recipes.svg';
import backgroundRecipes from '../styles/images/Backgroundrecipes.svg';

function Login(props) {
  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');

  const pswMinLeng = 6;
  const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const btnDisabled = password.length > pswMinLeng && email.match(validRegex);

  const onClickHander = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-main">
      <div className="login-header">
        <img src={ recipesImg } alt="background" className="login-logo" />
        <img src={ backgroundRecipes } alt="background" className="login-background" />
      </div>
      <img src={ tomateImg } alt="tomate" className="login-tomate" />
      <h1>LOGIN</h1>
      <label htmlFor="emailInput">
        <input
          id="emailInput"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="email-input"
          placeholder="Email"
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          id="passwordInput"
          type="password"
          value={ password }
          onChange={ (e) => setPassord(e.target.value) }
          data-testid="password-input"
          placeholder="Senha"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ onClickHander }
        disabled={ !btnDisabled }
      >
        ENTER
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
