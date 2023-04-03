import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

export default function ReceitasProvider({ children }) {
  const [teste, setTeste] = useState('ok');

  const globalState = useMemo(() => ({
    teste,
    setTeste,
  }), [teste]);

  return (
    <ReceitasContext.Provider value={ globalState }>
      { children }
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
