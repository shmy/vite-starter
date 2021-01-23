import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import 'antd/lib/style/index.css';
import 'flex.css/dist/data-flex.css';
import './styles/index.scss';
import App from './App';
import history from './utils/history.util'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  }).then(() => {

  ReactDOM.render(
    <React.StrictMode>
      <Router history={history}>
        <App/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
