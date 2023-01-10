import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { ScrollPicker } from '../components/ScrollPicker';

const DATA: number[] = [];
for (let i = 0; i <= 60; i++) {
  DATA.push(i);
}

export const ScrollPickerPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(5);
  const [displayItems, setDisplayItems] = useState(5);

  return (
    <SafeAreaView style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="3" onPress={() => setDisplayItems(3)}></Button>
          <Button title="5" onPress={() => setDisplayItems(5)}></Button>
          <Button title="7" onPress={() => setDisplayItems(7)}></Button>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>Current Index: </Text>
          <Text style={{ fontSize: 16 }}>{selectedIndex}</Text>
        </View>
      </View>

      <ScrollPicker data={DATA} selected={selectedIndex} setSelected={setSelectedIndex} displayItems={displayItems} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  container: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
});
