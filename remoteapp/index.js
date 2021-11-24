import React from 'react';
import type {Node} from 'react';
import {Text, SafeAreaView} from 'react-native';

const Remote: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 24}}>
      <Text>Hello Remote App</Text>
    </SafeAreaView>
  );
};

export default Remote;
