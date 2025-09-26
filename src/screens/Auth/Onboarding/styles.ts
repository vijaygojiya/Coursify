import {StyleSheet} from 'react-native';

export const DOT_SIZE = 8;
export const DOT_SPACING = 8;
export const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const styles = StyleSheet.create({
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginEnd: DOT_SPACING,
  },
});

export default styles;
