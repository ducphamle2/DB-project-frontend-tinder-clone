/**
 * @author DucPL
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './app/Main';
import store from './app/redux/stores/store';
import socketIO from 'socket.io-client';

export default class App extends Component {
  
  componentDidMount() {
    console.log('in did mount App.js');
    const socket = socketIO('http://192.168.56.1:3000/', {
      transports: ['websocket'], jsonp: false
    });
    socket.connect();
    socket.emit('sending-message', console.log('sendinggggggggggg'));
    socket.on('incoming-message',function (msg) {
      console.log ('A player moves on map ');
    })
  }

  render() {
    return (
      <Provider store = {store}>
        <Main />
      </Provider>
    );
  }
}