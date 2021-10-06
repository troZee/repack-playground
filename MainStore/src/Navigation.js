import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './App';
import {appArrayList, defaultApp} from './appList';
import MiniApp from './MiniApp';

const LazyDefaultApp = React.lazy(() => import('../defaultapp'));

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [defaultMiniApp, setDefaultMiniApp] = React.useState(null);

  React.useEffect(() => {
    (async function () {
      const bundle = await defaultApp.bundle();
      setDefaultMiniApp(React.createElement(bundle.default, {}));
    })();
  }, []);

  const DefaultApp = React.useCallback(() => defaultMiniApp, [defaultMiniApp]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="MiniApp" component={MiniApp} />
        <Stack.Screen name="DefaultApp" component={DefaultApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
