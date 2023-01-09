import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FONT_SIZE = 18;
const ITEM_HEIGHT = 50;

type Props = {
  displayItems?: number;
  data: any[];
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  showBorder?: boolean;
};
export const ScrollPicker = (props: Props) => {
  const { data, selected, setSelected, showBorder: showBorder = false } = props;
  let displayItems = props.displayItems || 5;
  if (displayItems % 2 === 0) {
    displayItems--;
  }
  const OFFSET_NUMBER = Math.floor(displayItems / 2);
  const DATA = [...new Array(OFFSET_NUMBER).fill(null), ...data, ...new Array(OFFSET_NUMBER).fill(null)];
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<any>();

  function scrollToItem(index: number) {
    const ref = listRef.current as FlatList;
    ref.scrollToIndex({ index: index - OFFSET_NUMBER, animated: true });
  }
  return (
    <View style={[styles.container, { height: displayItems * ITEM_HEIGHT, borderWidth: showBorder ? 1 : 0 }]}>
      <Animated.FlatList
        onLayout={() => {
          const ref = listRef.current as FlatList;
          ref.scrollToIndex({ index: selected, animated: true });
        }}
        ref={listRef}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={e => {
          setSelected(Math.floor(e.nativeEvent.contentOffset.y / ITEM_HEIGHT));
        }}
        data={DATA}
        renderItem={({ item, index }) => {
          const actualIndex = index - OFFSET_NUMBER;
          const inputRange: number[] = [];
          for (let i = 0, _offset = actualIndex - OFFSET_NUMBER; i < displayItems; i++, _offset++) {
            inputRange.push(_offset * ITEM_HEIGHT);
          }
          // const inputRange = [
          //   (actualIndex - 1) * ITEM_HEIGHT,
          //   actualIndex * ITEM_HEIGHT,
          //   (actualIndex + 1) * ITEM_HEIGHT,
          // ];
          // const inputRangeAdjacent = [(actualIndex - 1) * ITEM_HEIGHT, actualIndex * ITEM_HEIGHT, (actualIndex + 1) * ITEM_HEIGHT]
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [...new Array(OFFSET_NUMBER).fill(0.4), 1, ...new Array(OFFSET_NUMBER).fill(0.4)],
          });
          const fontScale = scrollY.interpolate({
            inputRange,
            outputRange: [...new Array(OFFSET_NUMBER).fill(1), 2, ...new Array(OFFSET_NUMBER).fill(1)],
          });

          const rotationZOutputRange: string[] = [];
          const MAX_ROTATION = 60;
          const rotationDiff = MAX_ROTATION / OFFSET_NUMBER;
          for (let i = 0; i < OFFSET_NUMBER; i++) {
            rotationZOutputRange.push(`${MAX_ROTATION - rotationDiff * i}deg`);
          }
          rotationZOutputRange.push('0deg');
          for (let i = 1; i <= OFFSET_NUMBER; i++) {
            rotationZOutputRange.push(`${rotationDiff * -i}deg`);
          }
          const rotationX = scrollY.interpolate({
            inputRange,
            outputRange: rotationZOutputRange,
          });

          return (
            <TouchableOpacity onPress={() => scrollToItem(index)}>
              <Animated.View style={[styles.itemContainer, { opacity, transform: [{ rotateX: rotationX }] }]}>
                <Animated.Text style={[styles.itemText, { transform: [{ scale: fontScale }] }]}>{item}</Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}></Animated.FlatList>
      <View pointerEvents="none" style={[styles.highlightPanel, { top: OFFSET_NUMBER * ITEM_HEIGHT }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'black',
    paddingHorizontal: 20,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: FONT_SIZE,
  },
  list: {
    // borderWidth: 1,
  },
  highlightPanel: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: ITEM_HEIGHT,
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
  },
});
