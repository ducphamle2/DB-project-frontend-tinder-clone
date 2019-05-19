/**
 * @author DucPL
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './app/Main';
import store from './app/redux/stores/store';

export default class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Main />
      </Provider>
    );
  }
}