import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></link>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App /> // Remove <React.StrictMode> wrapper
);