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
import {getAllInstalledApps, isAppInstalled} from './helpers';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    (async function () {
      const allInstalledApps = await getAllInstalledApps();
      const allApps = appArrayList.map(item => ({
        ...item,
        installed: allInstalledApps.includes(item),
      }));
      setApps(allApps);
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading ....</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 24}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex: 1}}>
        <View>
          <Section title="Apps">
            Choose the one app, that you would like to install
          </Section>
          <ScrollView horizontal>
            {apps.map(app => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}
                key={app.icon}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MiniApp', {appName: app.name});
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 60, height: 60, opacity: 0.5}}
                      source={{uri: app.icon}}
                    />
                    <Text>{app.name}</Text>
                    {app.installed ? null : <Text>click to install</Text>}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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

export default App;
