import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
} from 'react-native';

import App from './app/index';

Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Egiant extends Component {
  render() {
    return (
      <App />
    );
  }
}
AppRegistry.registerComponent('egiant', () => Egiant);
