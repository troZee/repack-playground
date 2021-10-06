import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {appArrayList, appObjectList} from './appList';
import {getAllInstalledApps, install, isAppInstalled} from './helpers';

const MiniApp: () => Node = ({navigation, route}) => {
  const [appContent, setAppContent] = useState(null);
  const {appName} = route.params;

  useEffect(() => {
    (async function () {
      try {
        const bundle = await install(appName, appObjectList[appName].bundle);
        setAppContent(React.createElement(bundle.default, {}));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return appContent;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default MiniApp;
