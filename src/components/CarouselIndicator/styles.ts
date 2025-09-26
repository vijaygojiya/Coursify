import {StyleSheet} from 'react-native';

const containerWith = 70;
const indicatorWidth = containerWith / 3;

const styles = StyleSheet.create({
  indicatorContainer: {
    width: containerWith,
    height: 3.8,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 17,
  },
  indicator: {
    height: '100%',
    width: indicatorWidth,
    borderRadius: 8,
  },
});
export default styles;
