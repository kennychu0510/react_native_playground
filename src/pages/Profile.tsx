import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from '../App';

export default function Profile() {
  const user = Auth.currentUser;
  const navigation = useNavigation<RootScreenNavigationProp>();

  async function logout() {
    try {
      await Auth.signOut();
      Alert.alert('logout success');
      navigation.goBack();
    } catch (error) {
      Alert.alert('logout failed', String(error));
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <View style={styles.container}>
        {user ? (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text>{user?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Created on:</Text>
              <Text>{Auth.currentUser?.metadata.creationTime}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Sign In:</Text>
              <Text>{Auth.currentUser?.metadata.lastSignInTime}</Text>
            </View>
          </>
        ) : (
          <Text>You are not logged in</Text>
        )}
      </View>
      {user ? <Button onPress={logout} title="Logout"></Button> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    // backgroundColor: 'pink'
  },
});
