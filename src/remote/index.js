import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

const Remote = React.lazy(() =>
  import(/* webpackChunkName: "remoteapp" */ './Remote'),
);

export default () => {
  return (
    <View>
      <React.Suspense
        fallback={
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }>
        <Remote />
      </React.Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 300,
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10,
  },
});
