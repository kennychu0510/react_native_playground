import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import { Auth } from '../firebase';
import { Loading } from './Loading';

type RootScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PAGES = [
  { name: 'Scroll Picker', component: 'ScrollPicker' as const },
  { name: 'Dropdown Menu', component: 'DropdownMenu' as const },
  { name: 'Drag Release', component: 'DragRelease' as const },
  { name: 'Animated Scroll', component: 'AnimatedScroll' as const },
  { name: 'Login', component: 'Login' as const },
  { name: 'Profile', component: 'Profile' as const },
  { name: 'Firebase To Do List', component: 'ToDoList' as const },
];

export const Landing = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();

  function logout() {
    navigation.navigate('Profile');
  }

  function login() {
    navigation.navigate('Login');
  }

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (Auth.currentUser ? <Button title="Logout" onPress={logout} /> : <Button title="Login" onPress={login} />),
    });
  }, [navigation, Auth.currentUser]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        {PAGES.map((item, idx) => (
          <View key={idx} style={styles.button}>
            <Button onPress={() => navigation.navigate(item.component)} title={item.name}></Button>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
});
