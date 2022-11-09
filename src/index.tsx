import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {Provider} from 'react-redux';
import App from "./components/App/App";

const Store = store;

ReactDOM.render(
    <Provider store={Store}>
      <React.StrictMode>
         <App/>
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);
