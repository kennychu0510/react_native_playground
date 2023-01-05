import React, {useState, type PropsWithChildren} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {ScrollPicker} from './ScrollPicker';

const DATA: (number)[] = [];
const DISPLAY_ITEMS = 5;
const OFFSET_NUMBER = Math.floor(DISPLAY_ITEMS / 2);

for (let i = 0; i <= 60; i++) {
  DATA.push(i);
}

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={{fontSize: 16}}>Current Index: </Text>
        <Text style={{fontSize: 16}}>{selectedIndex}</Text>
      </View>
      <ScrollPicker data={DATA} selected={selectedIndex} setSelected={setSelectedIndex}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
