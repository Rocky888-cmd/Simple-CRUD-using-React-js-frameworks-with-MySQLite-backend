// main.jsx — entry point of the React app.
// ReactDOM renders the App component into the <div id="root"> in index.html.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
