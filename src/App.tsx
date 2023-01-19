import React, { useState, type PropsWithChildren } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ScrollPicker } from './components/ScrollPicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollPickerPage } from './pages/ScrollPickerPage';
import { Landing } from './pages/Landing';
import { DropdownMenuPage } from './pages/DropdownMenuPage';
import { DragRelease } from './pages/DragRelease';
import { AnimatedScroll } from './pages/AnimatedScroll';

export type RootStackParamList = {
  Landing: undefined;
  ScrollPicker: undefined;
  DropdownMenu: undefined;
  DragRelease: undefined;
  AnimatedScroll: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ title: 'Playground' }} />
        <Stack.Screen name="ScrollPicker" component={ScrollPickerPage} />
        <Stack.Screen name="DropdownMenu" component={DropdownMenuPage} />
        <Stack.Screen name="DragRelease" component={DragRelease} />
        <Stack.Screen name="AnimatedScroll" component={AnimatedScroll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
