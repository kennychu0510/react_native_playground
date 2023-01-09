import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Carrot } from './Carrot';
import { useHeaderHeight } from '@react-navigation/elements';

type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  data: { label: string; value: string }[];
};

const ITEM_HEIGHT = 30;
export const DropdownMenu = (props: Props) => {
  const { selected, setSelected, placeholder: placeholder = 'Nothing Selected', data } = props;
  const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const flatListRef = useRef<FlatList>(null);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<View>(null);
  const [position, setPosition] = useState({
    pageX: 0,
    pageY: 0,
    width: 0,
    height: 0,
  });

  function setMenuState() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setPosition({
        width,
        height,
        pageX,
        pageY,
      });
    });
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function onItemSelect(value: string) {
    setSelected(value);
    closeMenu();
  }

  const carrotAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(carrotAnimation, {
        toValue: 180,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(carrotAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);
  return (
    <>
      <TouchableOpacity style={{ width: '100%' }} onPress={setMenuState}>
        <View style={styles.container} ref={ref} onLayout={e => {}}>
          <Text style={selected ? null : styles.placeholder}>{selected ? selected : placeholder}</Text>
          <Animated.View
            style={{
              width: 15,
              aspectRatio: 1,
              transform: [
                {
                  rotateZ: carrotAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}>
            <Carrot />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <Modal transparent={true} visible={isOpen}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <FlatList
                ref={flatListRef}
                onLayout={() => {
                  flatListRef.current?.scrollToIndex({
                    animated: false,
                    index: data.findIndex(item => item.value === selected),
                  });
                }}
                getItemLayout={(data, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                style={[
                  styles.menu,
                  {
                    position: 'absolute',
                    top: position.pageY + position.height,
                    left: position.pageX,
                    width: position.width,
                  },
                ]}
                snapToInterval={ITEM_HEIGHT}
                data={data}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => onItemSelect(item.value)}>
                      <View style={[{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center', width: '100%' }, selected === item.value ? styles.highlight : null]}>
                        <Text>{item.label}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}></FlatList>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    color: 'grey',
  },
  menu: {
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 5,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    maxHeight: Math.floor(Dimensions.get('screen').height / 2 / ITEM_HEIGHT) * ITEM_HEIGHT,
    zIndex: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  highlight: {
    backgroundColor: 'rgb(180,180,180)',
  },
});
