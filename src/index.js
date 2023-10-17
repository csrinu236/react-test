import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { init } from '@noriginmedia/norigin-spatial-navigation';
import { BrowserRouter } from 'react-router-dom';

init({
  // options
  // debug: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
