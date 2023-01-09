import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { DropdownMenu } from '../components/DropdownMenu';

export const DropdownMenuPage = () => {
  const [displayText, setDisplayText] = useState('');

  const DATA = [];
  for (let i = 0; i < 50; i++) {
    DATA.push({ label: 'item ' + i, value: 'item ' + i });
  }
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={{ height: 500, width: '100%' }}></View>
        <DropdownMenu selected={displayText} setSelected={setDisplayText} data={DATA} />
        <View style={{ height: 500, width: '100%' }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
