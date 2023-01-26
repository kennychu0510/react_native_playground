import { Alert, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from '../App';
import { StackActions } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RootScreenNavigationProp>();

  useEffect(() => {
    /* Redirect to profile page and remove login page in navigation state if already logged in*/
    Auth.onAuthStateChanged(user => {
      if (user) {
        navigation.dispatch(state => {
          return StackActions.pop();
        });
        navigation.navigate('Profile');
      }
    });
  }, []);

  function handleSignUp() {
    createUserWithEmailAndPassword(Auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        Alert.alert('Sign up success');
      })
      .catch(error => {
        console.log(error.message);
        Alert.alert('Could not sign up', error.message);
      });
  }

  function handleLogin() {
    signInWithEmailAndPassword(Auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .catch(error => {
        console.log(error.message);
        Alert.alert('Could not login', error.message);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder={'Username'} value={email} onChangeText={setEmail} autoCapitalize="none" />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder={'Password'} secureTextEntry onChangeText={setPassword} />
      </View>
      <Button title={'Login'} onPress={handleLogin} />
      <View style={{ marginTop: 5 }} />
      <Button title={'Register'} onPress={handleSignUp} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    width: 200,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
});
