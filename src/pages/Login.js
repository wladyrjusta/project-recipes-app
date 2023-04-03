import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function Login(props) {
  const RContext = useContext(ReceitasContext);
  const { teste } = RContext;
  console.log(teste);

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
        onClick={ onClickHander }
        disabled={ !btnDisabled }
      >
        Login

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
