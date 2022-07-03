import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import AppRouter from "./AppRouter";

const store = setupStore()

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


