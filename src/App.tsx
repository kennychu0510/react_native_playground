import React, {useState, type PropsWithChildren} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {ScrollPicker} from './ScrollPicker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScrollPickerPage} from './pages/ScrollPickerPage';
import {Landing} from './pages/Landing';

const DATA: number[] = [];
for (let i = 0; i <= 60; i++) {
  DATA.push(i);
}

type RootStackParamList = {
  Landing: undefined,
  ScrollPicker: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="ScrollPicker" component={ScrollPickerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
