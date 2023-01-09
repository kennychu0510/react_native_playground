import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';

type RootScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PAGES = [
  { name: 'Scroll Picker', component: 'ScrollPicker' as const },
  { name: 'Dropdown Menu', component: 'DropdownMenu' as const },
  { name: 'Roulette', component: 'Roulette' as const },
];

export const Landing = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
