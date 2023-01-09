import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

export const Landing = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This is React Native Playground</Text>
      </View>
    </SafeAreaView>
  );
};
