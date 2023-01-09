import React, {useState, type PropsWithChildren} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {ScrollPicker} from './ScrollPicker';

const DATA: (number)[] = [];
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
      <ScrollPicker data={DATA} selected={selectedIndex} setSelected={setSelectedIndex} displayItems={7}/>
    </SafeAreaView>
  );
};

export default App;
