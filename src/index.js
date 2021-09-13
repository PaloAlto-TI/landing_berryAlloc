import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./_redux/configureStore";



ReactDOM.render(
  <React.Fragment>
  <Provider store={store}>
    <App />
    </Provider>

  </React.Fragment>,

  document.getElementById('root')
);


serviceWorkerRegistration.register();


reportWebVitals();
