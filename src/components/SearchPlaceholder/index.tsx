import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {SearchFill, SearchLine} from '@/assets';
import {textVariants} from '@/styles';
const suggestions = ['React', 'Mobile', 'React Native', 'Android'];
const SearchPlaceholder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateY = useSharedValue(0);

  const setIndexFunc = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % suggestions.length);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger the animation
      translateY.value = withTiming(-15, {duration: 600}, () => {
        // Reset translateY after reaching the top
        translateY.value = withTiming(0, {duration: 0});
        runOnJS(setIndexFunc)();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, translateY, setIndexFunc]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: withTiming(translateY.value === 0 ? 1 : 0, {duration: 750}), // Hide placeholder when input has value
  }));
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, {borderColor: colors.infoBorder}]}>
        <SearchLine style={{transform: [{rotate: '-45deg'}], marginEnd: 6}} />
        <Text
          style={[
            textVariants.small,
            styles.placeholder,
            {color: colors.neutral70},
          ]}>
          Search for{' '}
        </Text>
        <Animated.Text
          style={[
            textVariants.small,
            styles.placeholder,
            animatedStyle,
            {color: colors.neutral70},
          ]}>
          {suggestions[currentIndex]}
        </Animated.Text>
      </View>
    </View>
  );
};

export default SearchPlaceholder;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  inputContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
  },
  input: {
    fontSize: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});
