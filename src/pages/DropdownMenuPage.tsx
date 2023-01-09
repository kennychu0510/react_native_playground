import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { DropdownMenu } from '../components/DropdownMenu';

export const DropdownMenuPage = () => {
  const [displayText, setDisplayText] = useState('');

  const DATA = [];
  for (let i = 0; i < 10; i++) {
    DATA.push({ label: 'item ' + i, value: 'item ' + i });
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
      <DropdownMenu selected={displayText} setSelected={setDisplayText} data={DATA} />
    </SafeAreaView>
  );
};
