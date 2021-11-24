/**
 * @format
 */

import React from 'react';
import {AppRegistry, Alert} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Navigation from './src/Navigation';
import {ChunkManager} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const version = 'v1';

ChunkManager.configure({
  storage: AsyncStorage,
  resolveRemoteChunk: async chunkId => {
    //Alert.alert('asd', JSON.stringify(Object.keys(global), null, 2));
    Alert.alert(
      'asd',
      `${chunkId}, ${global.__CHUNKS__?.local?.includes(chunkId)}`,
    );
    const url = `https://raw.githubusercontent.com/troZee/repack-bundle-cdn/main/${version}/${Platform.OS}/remote/${chunkId}`;
    return {
      url,
    };
  },
});
export function Root() {
  return <Navigation />;
}

AppRegistry.registerComponent(appName, () => Root);
