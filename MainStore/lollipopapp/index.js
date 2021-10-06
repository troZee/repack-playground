import React from 'react';
import type {Node} from 'react';
import {Text, SafeAreaView} from 'react-native';

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 24}}>
      <Text>Hello Lollipop</Text>
    </SafeAreaView>
  );
};

export default App;
