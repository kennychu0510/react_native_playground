import React, { useState, type PropsWithChildren } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ScrollPicker } from './components/ScrollPicker';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollPickerPage } from './pages/ScrollPickerPage';
import { Landing } from './pages/Landing';
import { DropdownMenuPage } from './pages/DropdownMenuPage';
import { DragRelease } from './pages/DragRelease';
import { AnimatedScroll } from './pages/AnimatedScroll';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from './firebase';
import Database from './pages/Database';
import { Loading } from './pages/Loading';

export type RootStackParamList = {
  Landing: undefined;
  ScrollPicker: undefined;
  DropdownMenu: undefined;
  DragRelease: undefined;
  AnimatedScroll: undefined;
  Login: undefined;
  Profile: undefined;
  Database: undefined;
};

export type RootScreenNavigationProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isLoggedIn = Auth.currentUser;

  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ title: 'Playground' }} />
        <Stack.Screen name="ScrollPicker" component={ScrollPickerPage} />
        <Stack.Screen name="DropdownMenu" component={DropdownMenuPage} />
        <Stack.Screen name="DragRelease" component={DragRelease} />
        <Stack.Screen name="AnimatedScroll" component={AnimatedScroll} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Database" component={Database} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
