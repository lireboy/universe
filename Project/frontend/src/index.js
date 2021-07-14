import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"; 
import './css/index.css';
import App from './js/App';
import reportWebVitals from './js/reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/Header.css';
import './css/loginView.css';
import './css/Library.css';
import './css/settings.css';
import './css/profile.css';
import './css/App.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
