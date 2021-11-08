import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// import store from "./_redux/configureStore";



ReactDOM.render(
  <React.Fragment>
 
    <App />
    

  </React.Fragment>,

  document.getElementById('root')
);

//kbcvm,cxbv,m
serviceWorkerRegistration.register();

if (process.env.NODE_ENV !== "development")
    console.log = () => {};
    
reportWebVitals();
