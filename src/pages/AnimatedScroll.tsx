import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { AnimatedScrollPage } from '../components/AnimatedScrollPage';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

export const AnimatedScroll = () => {
  return (
    <Animated.ScrollView style={styles.container} horizontal={true}>
      {WORDS.map((title, index) => {
        return <AnimatedScrollPage key={index} title={title} index={index} />;
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
