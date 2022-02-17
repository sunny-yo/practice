import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth-service';
import firebaseApp from './service/firebase';
import { BrowserRouter } from 'react-router-dom';
import DataRepository from './service/data-repository';

const authService = new AuthService(firebaseApp);
const dataRepository = new DataRepository(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authService={authService} dataRepository={dataRepository} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
