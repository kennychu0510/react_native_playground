import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Carrot } from './Carrot';

type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};
export const DropdownMenu = (props: Props) => {
  const { selected, setSelected, placeholder: placeholder = 'Nothing Selected' } = props;
  const [isOpen, setIsOpen] = useState(false);

  function setMenuState() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
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
    <TouchableOpacity style={{ width: '100%' }} onPress={setMenuState}>
      <View style={styles.container}>
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
});
