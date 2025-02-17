import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Création de la racine React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Ajout de BrowserRouter avec un basename pour GitHub Pages */}
    <BrowserRouter basename="/romi-box"> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Mesure des performances (optionnel)
reportWebVitals();