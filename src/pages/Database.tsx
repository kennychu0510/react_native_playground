import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth, Database as FirebaseDB } from '../firebase';
import { onValue, ref, set } from 'firebase/database';

export default function Database() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    if (!Auth.currentUser) return;
    const itemRef = ref(FirebaseDB, 'items/' + Auth.currentUser.uid);
    const unsubscribe = onValue(itemRef, snapshot => {
      if (snapshot.exists()) {
        const data = JSON.parse(snapshot.val().items);
        setData(data);
      } else {
        setData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  function onItemAdd() {
    if (!Auth.currentUser) {
      Alert.alert('You are not logged in');
      return;
    }

    const itemsCombined = [...data, item];

    set(ref(FirebaseDB, 'items/' + Auth.currentUser.uid), {
      items: JSON.stringify(itemsCombined),
    });

    // Alert.alert('adding item:', item)
    setItem('');
  }

  function onClear() {
    if (!Auth.currentUser) {
      Alert.alert('You are not logged in');
      return;
    }

    Alert.alert('Are you sure you want to clear your items?', undefined, [
      { text: 'Cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          set(ref(FirebaseDB, 'items/' + Auth.currentUser!.uid), {
            items: [],
          });
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} placeholder="to do item" value={item} onChangeText={setItem} autoCapitalize="none"></TextInput>
        <View style={styles.button}>
          <Button onPress={onItemAdd} title={'add'}></Button>
        </View>
      </View>
      <View style={{ marginHorizontal: 10, flex: 1, marginVertical: 10 }}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.item}>
                <Text style={styles.numberIndicator}>{index + 1}.</Text>
                <Text>{item}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ flex: 1, color: 'grey' }}>You have no items</Text>
        )}
      </View>
      <Button onPress={onClear} title="Clear"></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    marginHorizontal: 5,
  },
  item: {
    margin: 5,
    flexDirection: 'row',
  },
  numberIndicator: {
    width: 20,
  },
});
