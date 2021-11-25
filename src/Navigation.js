import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './App';
import {appArrayList, appObjectList, remoteApp} from './appList';
import MiniApp from './MiniApp';
import {getAllInstalledApps, install, uninstall} from './helpers';
import AppsContext from './AppsContext';
import {ChunkManager} from '@callstack/repack/client';
import {RemoteApp} from './RemoteApp';

const LazyDefaultApp = React.lazy(() => import('../defaultapp'));

const Stack = createNativeStackNavigator();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default function Navigation() {
  const [installedApps, setInstalledApps] = React.useState([]);
  const [exports, setExports] = React.useState({});

  const installApp = React.useCallback(
    async app => {
      const bundle = await install(app.name, app.bundle);
      setExports({...exports, [app.name]: bundle});
      setInstalledApps([...installedApps, app.name]);
    },
    [exports, installedApps],
  );

  const uninstallApp = React.useCallback(
    async app => {
      await uninstall(app.name);
      setExports({...exports, [app.name]: undefined});
      setInstalledApps(installedApps.filter(item => item !== app.name));
    },
    [exports, installedApps],
  );

  React.useEffect(() => {
    (async function () {
      // const allInstalledApps = await getAllInstalledApps();
      // setInstalledApps([...installedApps, ...allInstalledApps]);
      // await asyncForEach(allInstalledApps, async function (item, index, array) {
      //   const bundle = await appObjectList[item].bundle();
      //   setExports({...exports, [item]: bundle});
      // });
    })();
    //do it only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DefaultApp = React.useCallback(
    () => (
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <LazyDefaultApp />
      </React.Suspense>
    ),
    [],
  );

  return (
    <AppsContext.Provider
      value={{
        installApp,
        uninstallApp,
        installedApps,
        exports,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="MiniApp" component={MiniApp} />
          <Stack.Screen name="DefaultApp" component={DefaultApp} />
          <Stack.Screen name="RemoteApp" component={RemoteApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppsContext.Provider>
  );
}
