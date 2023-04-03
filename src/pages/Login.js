import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';

function Login() {
  const RContext = useContext(ReceitasContext);
  const { teste } = RContext;
  console.log(teste);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default Login;
