import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

type ContextInterface = {
  translateX: number;
  translateY: number;
};

export const DragRelease = () => {
  const progress = useSharedValue(0.2);
  const scale = useSharedValue(0.5);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextInterface>({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  // const reanimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: progress.value,
  //     transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
  //   };
  // }, []);

  // useEffect(() => {
  //   progress.value = withRepeat(withSpring(1), Infinity, true);
  //   scale.value = withRepeat(withSpring(2), Infinity, true);
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            {
              height: 50,
              width: 50,
              backgroundColor: 'blue',
            },
            rStyle,
          ]}></Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
