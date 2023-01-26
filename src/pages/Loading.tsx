import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');
export function Loading() {
  return (
    <Modal transparent={true} statusBarTranslucent={true}>
      <View style={{ flex: 1, height, width, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="white" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
