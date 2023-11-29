import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyResults from './MyResults';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyResults />
  </React.StrictMode>
);
