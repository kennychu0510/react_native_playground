import React, {useRef} from 'react';
import {Animated, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FONT_SIZE = 16;
const ITEM_HEIGHT = 50;

type Props = {
  displayItems?: number;
  data: any[];
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};
export const ScrollPicker = (props: Props) => {
  const {displayItems = 5, data, selected, setSelected} = props;
  const OFFSET_NUMBER = Math.floor(displayItems / 2);

  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<any>();

  function scrollToItem(index: number) {
    const ref = listRef.current as FlatList;
    ref.scrollToIndex({index: index - OFFSET_NUMBER, animated: true});
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        onLayout={() => {
          const ref = listRef.current as FlatList;
          ref.scrollToIndex({index: selected, animated: true});
        }}
        ref={listRef}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
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
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={(e) => {
          setSelected(Math.floor(e.nativeEvent.contentOffset.y/ITEM_HEIGHT))
        }}
        data={data}
        renderItem={({item, index}) => {
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
            outputRange: [0.4, 0.4, 1, 0.4, 0.4],
          });
          const fontScale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 2, 1, 1],
          });
          // const transformZ = scrollY.interpolate({
          //   inputRange,
          //   outputRange: []
          // })

          return (
            <TouchableOpacity onPress={() => scrollToItem(index)}>
              <Animated.View style={[styles.itemContainer, {opacity}]}>
                <Animated.Text style={[styles.itemText, {transform: [{scale: fontScale}]}]}>{item}</Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}></Animated.FlatList>
      <View pointerEvents="none" style={styles.highlightPanel}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 5,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'grey',
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
    top: 2 * ITEM_HEIGHT,
  },
});
