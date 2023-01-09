import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';

type RootScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Landing = () => {
  const navigation = useNavigation<RootScreenNavigationProp>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.button}>
          <Button onPress={() => navigation.navigate('ScrollPicker')} title="Scroll Picker"></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
});
