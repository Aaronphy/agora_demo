import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/index';
import { StoresProvider, stores } from './store/index';

const WrappedApp = () => <StoresProvider value={stores}>
    <App />
  </StoresProvider>;

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
