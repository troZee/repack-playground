import React from 'react';
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
  Button,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {appArrayList} from './appList';
import AppsContext from './AppsContext';

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
  const {installedApps, installApp, uninstallApp} =
    React.useContext(AppsContext);

  const apps = React.useMemo(() => {
    return appArrayList.map(item => {
      return {
        ...item,
        installed: installedApps.includes(item.name),
      };
    });
  }, [installedApps]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Section title="Apps">
            Choose the one app, that you would like to install
          </Section>
          <ScrollView horizontal>
            {apps.map(app => (
              <View style={styles.itemContainer} key={app.icon}>
                <TouchableOpacity
                  onLongPress={() => {
                    if (app.installed) {
                      Alert.alert('Mini Apps', 'Do you want to uninstall ?', [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          style: 'destructive',
                          onPress: () => {
                            uninstallApp(app);
                          },
                        },
                      ]);
                    }
                  }}
                  onPress={() => {
                    if (app.installed) {
                      navigation.navigate('MiniApp', {appName: app.name});
                    } else {
                      installApp(app);
                    }
                  }}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        opacity: app.installed ? 1 : 0.5,
                      }}
                      source={{uri: app.icon}}
                    />
                    <Text>{app.name}</Text>
                    {app.installed ? null : <Text>click to install</Text>}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Section title="Default Lazy app">
            Click the button to display installed app by default
          </Section>
          <Button
            onPress={() => {
              navigation.navigate('DefaultApp');
            }}
            title="open default app"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 24},
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
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
