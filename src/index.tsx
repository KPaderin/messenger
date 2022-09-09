import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {addChat} from "./store/actionCreators/addChat";

import App from './components/App';

const Store = store;

const unsubscribe = Store.subscribe(() =>
    console.log(Store.getState())
)

Store.dispatch(addChat('123',[1,2], '123', '123', '123', '123'));
unsubscribe();

ReactDOM.render(
  <React.StrictMode>
     <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
