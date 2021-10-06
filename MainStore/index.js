/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Navigation from './src/Navigation';

export function Root() {
  return <Navigation />;
}

AppRegistry.registerComponent(appName, () => Root);
