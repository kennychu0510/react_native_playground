import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

type Props = {
  title: string;
  index: number;
};

const { height, width } = Dimensions.get('window');

export const AnimatedScrollPage = (props: Props) => {
  return <View style={styles.pageContainer}></View>;
};

const styles = StyleSheet.create({
  pageContainer: {
    width: width,
    height: height,
    backgroundColor: 'blue',
  },
});
