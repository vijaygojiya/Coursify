import {StyleSheet} from 'react-native';

const containerWith = 70;
const indicatorWidth = containerWith / 3;

const styles = StyleSheet.create({
  indicatorContainer: {
    width: containerWith,
    height: 5,
    borderRadius: 18,
    alignSelf: 'center',
    marginBottom: 12,
  },
  indicator: {
    height: '100%',
    width: indicatorWidth,
    borderRadius: 8,
  },
});
export default styles;
