import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {Provider} from 'react-redux';
import App from "./App";

const Store = store;

ReactDOM.render(
    <Provider store={Store}>
         <App/>
    </Provider>,
  document.getElementById('root')
);
