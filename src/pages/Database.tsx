import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth, Database as FirebaseDB } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import { RootScreenNavigationProp } from '../App';
import { useNavigation } from '@react-navigation/native';

export default function Database() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState('');
  const navigation = useNavigation<RootScreenNavigationProp>();
  const [isEditMode, setIsEditMode] = useState(false);

  function onEdit() {
    setIsEditMode(true);
  }
  function onDone() {
    if (Auth.currentUser) {
      set(ref(FirebaseDB, 'items/' + Auth.currentUser.uid), {
        items: JSON.stringify(data),
      });
    }
    setIsEditMode(false);
  }

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (!isEditMode ? <Button title="Edit" onPress={onEdit} /> : <Button title="Done" onPress={onDone} />),
    });
  }, [navigation, Auth.currentUser, isEditMode, data]);

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

  function onItemDelete(index: number) {
    setData(data => data.filter((_, idx) => idx !== index));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
        <TextInput style={styles.input} placeholder="new item" value={item} onChangeText={setItem} autoCapitalize="none"></TextInput>
        <TouchableOpacity onPress={onItemAdd}>
          <View style={{ backgroundColor: '#298e46', borderRadius: 10, height: 30, justifyContent: 'center', paddingHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 10, flex: 1, marginVertical: 10 }}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.item}>
                <Text style={styles.numberIndicator}>{index + 1}.</Text>
                <Text style={{ fontSize: 20 }}>{item}</Text>
                {isEditMode && (
                  <TouchableOpacity onPress={() => onItemDelete(index)} style={{ marginLeft: 'auto' }}>
                    <View style={{ backgroundColor: 'rgb(236,105,106)', borderRadius: 10, height: 30, justifyContent: 'center', paddingHorizontal: 10 }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                )}
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
    marginRight: 10,
    fontSize: 20,
  },
  button: {
    marginHorizontal: 5,
  },
  item: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  numberIndicator: {
    width: 25,
    fontSize: 20,
  },
});
