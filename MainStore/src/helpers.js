import {ChunkManager} from '@callstack/repack/client';
// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();
import AsyncStorage from '@react-native-async-storage/async-storage';

const install = async (name, path) => {
  try {
    const bundle = await import(/* webpackChunkName: `${name}` */ path);
    // storage.set(name, true);
    await AsyncStorage.setItem(name, true);
    return bundle;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const uninstall = async name => {
  try {
    await ChunkManager.invalidateChunks([name]);
    // storage.delete(name);
    await AsyncStorage.removeItem(name);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const isAppInstalled = name => {
  //   return storage.getBoolean(name);
};

const getAllInstalledApps = async () => {
  //   return storage.getAllKeys();
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    return [];
  }
};

// const getApp = async (name, path) => {
//     try {
//       const bundle = await import(/* webpackChunkName: `${name}` */ './MiniApp');
//       storage.set(name, true);
//       return bundle;
//     } catch (e) {
//       console.log(e);
//       return null;
//     }
//   };

export {install, uninstall, isAppInstalled, getAllInstalledApps};
