import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from './App';
import {appArrayList} from './appList';
import MiniApp from './MiniApp';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="MiniApp" component={MiniApp} />
        {/* {appArrayList.map(app => {
          return (
            <Stack.Screen
              key={app.name}
              name={app.name}
              component={app.bundle}
            />
          );
        })} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}