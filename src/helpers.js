import {ChunkManager} from '@callstack/repack/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const install = async (name, bundle) => {
  try {
    await AsyncStorage.setItem(name, name);
    return await bundle();
  } catch (e) {
    console.log(e);
    return null;
  }
};

const uninstall = async name => {
  try {
    await ChunkManager.invalidateChunks([name]);
    await AsyncStorage.removeItem(name);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getAllInstalledApps = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    return [];
  }
};

export {install, uninstall, getAllInstalledApps};
